import React, { useContext, useEffect, useRef, useState } from "react";
import {
  closeContextMenu,
  getDragAfterElement,
  hideHoverBox,
  nestingValidation,
  showContextMenu,
  showHoverBox,
} from "../../../../utils";
import { CommandContext } from "../../../../contexts/CommandContext";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
const nonClosingTags = ["img", "video", "input", "hr", "br"];

export function IframeElement({ data, parentElement, contextMenu }) {
  const [element, setElement] = useState();
  const elementRef = useRef();
  const { moveElement, setSelectedElement } = useContext(PageTreeContext);
  const { addCommand } = useContext(CommandContext);

  const HTMLTag = `${data.tagName}`;
  let elemAttributes = Object.assign({}, data.attributes);
  delete elemAttributes.class;

  useEffect(() => {
    if (data) {
      setElement((prev) => data);
    }
  }, [data]);

  const handleClick = (e) => {
    e.stopPropagation();
    closeContextMenu(e, contextMenu);
    let from = parentElement._id
      ? parentElement.children_order.indexOf(element._id)
      : null;
    setSelectedElement((prev) => ({ element, from }));
  };

  const openContextMenu = (e, contextMenu) => {
    e.preventDefault();
    e.stopPropagation();
    let from = parentElement._id
      ? parentElement.children_order.indexOf(element._id)
      : null;
    setSelectedElement((prev) => ({ element, from }));
    showContextMenu(e, contextMenu);
    return false;
  };

  const handleDrop = (e) => {
    e.stopPropagation();
    try {
      let data = JSON.parse(e.dataTransfer.getData("draggedElement"));
      let draggedParent = JSON.parse(
        localStorage.getItem("draggedParent") || "{}"
      );
      let afterElement = localStorage.getItem("afterElement");

      if (!element.path.includes(data._id) && data._id !== element._id) {
        let targetPath = element.path.concat(element._id);
        let from = draggedParent._id
          ? data._id
            ? draggedParent.children_order.indexOf(data._id)
            : draggedParent.children_order.length
          : null;
        let to = afterElement
          ? element.children_order.indexOf(afterElement)
          : element.children_order.length;

        if (afterElement && draggedParent._id === element._id) {
          if (to > from) to = to - 1;
          let prevIndex = draggedParent.children_order.indexOf(data._id);
          let currentIndex = element.children_order.indexOf(afterElement);
          if (
            prevIndex === currentIndex ||
            draggedParent.children_order[prevIndex + 1] === afterElement
          )
            return 0;
        } else if (element.children_order.slice(-1)[0] === data._id) return 0;

        addCommand({
          action: "moveElement",
          element: data,
          parent: data.path,
          target: targetPath,
          from,
          to,
        });
        // data.path passed separately because of interchange between parent and target path while undoing and redoing
        moveElement(data, data.path, targetPath, from, to);
      }
      localStorage.setItem("afterElement", "");
      localStorage.setItem("draggedElement", "");
      localStorage.setItem("draggedParent", "");
      document.getElementById("after-element-line").style.display = "none";
    } catch (error) {}
  };

  const handleDragOver = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let container = elementRef.current;
    const afterElement = getDragAfterElement(container, e.clientX, e.clientY);
    if (!afterElement) {
      document.getElementById("after-element-line").style.display = "none";
    }
    localStorage.setItem(
      "afterElement",
      afterElement ? afterElement.dataset._id : ""
    );

    let draggedElement = localStorage.getItem("draggedElement");
    if (draggedElement !== "") {
      let { tagName } = JSON.parse(draggedElement);
      let parentTag = elementRef.current.tagName;
      if (nestingValidation(parentTag, tagName, nonClosingTags)) {
        showHoverBox(e.target);
      } else {
        showHoverBox(e.target, "#e74c3c");
      }
    }
  };

  const handleDragStart = (e) => {
    e.stopPropagation();
    e.target.style.opacity = "0.6";
    let { children, ...data } = element;
    let { children: pc, ...parentData } = parentElement;
    e.dataTransfer.setData("draggedElement", JSON.stringify(data));
    localStorage.setItem("draggedElement", JSON.stringify(data));
    localStorage.setItem("draggedParent", JSON.stringify(parentData));
  };

  const handleDragend = (e) => {
    e.target.style.opacity = "";
  };

  return element ? (
    !nonClosingTags.includes(HTMLTag) ? (
      <HTMLTag
        ref={elementRef}
        draggable={true}
        onClick={handleClick}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={(e) => hideHoverBox(e)}
        onDragEnd={handleDragend}
        onDrop={handleDrop}
        onMouseOver={(e) => showHoverBox(e.target)}
        onMouseOut={(e) => hideHoverBox(e)}
        onContextMenu={(e) => openContextMenu(e, contextMenu)}
        className={"frame-element " + element.attributes["class"]}
        data-_id={element._id}
        {...elemAttributes}
      >
        {element.text.join("")}
        {element.children_order.map((elem) => {
          return (
            <IframeElement
              key={element.children[elem]._id}
              contextMenu={contextMenu}
              data={element.children[elem]}
              parentElement={element}
            ></IframeElement>
          );
        })}
      </HTMLTag>
    ) : (
      <HTMLTag
        title={HTMLTag}
        ref={elementRef}
        data-_id={element._id}
        draggable={true}
        onClick={handleClick}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={(e) => hideHoverBox(e)}
        onDragEnd={handleDragend}
        onMouseOver={(e) => showHoverBox(e.target)}
        onMouseOut={(e) => hideHoverBox(e)}
        onContextMenu={(e) => openContextMenu(e, contextMenu)}
        className={"frame-element " + element.attributes["class"]}
        readOnly={HTMLTag === "input" ? true : false}
        controls={HTMLTag === "video" ? true : false}
        {...elemAttributes}
      />
    )
  ) : null;
}
