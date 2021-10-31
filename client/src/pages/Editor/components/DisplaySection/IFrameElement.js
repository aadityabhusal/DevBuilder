import React, { useContext, useEffect, useRef, useState } from "react";
import {
  closeContextMenu,
  getDragAfterElement,
  hideHoverBox,
  nestingValidation,
  showHoverBox,
} from "../../../../utils";
import { CommandContext } from "../../../../contexts/CommandContext";
import { SelectedElementContext } from "../../../../contexts/SelectedElementContext";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
const nonClosingTags = ["img", "video", "input", "hr", "br"];

export function IframeElement({ data, parentElement, contextMenu }) {
  const [element, setElement] = useState();
  const elementRef = useRef();
  const { pageTree } = useContext(PageTreeContext);
  const { setSelectedElement } = useContext(SelectedElementContext);
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
    setSelectedElement(element);
  };

  const openContextMenu = (e, contextMenu) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedElement(element);
    contextMenu.current.style.display = "flex";
    contextMenu.current.style.top = e.clientY + "px";
    contextMenu.current.style.left = e.clientX + "px";
    return false;
  };

  const handleDrop = (e) => {
    e.stopPropagation();
    try {
      let data = JSON.parse(e.dataTransfer.getData("draggedElement"));
      if (!data._id)
        data._id = performance.now().toString(36).replace(/\./g, "");
      if (!data.path.length) data.path = [...element.path, element._id];
      let afterElement = localStorage.getItem("afterElement");

      if (!element.path.includes(data._id) && data._id !== element._id) {
        let prevParent = removeElementFromParent(data, afterElement);
        insertElement(data, afterElement, prevParent);
      }
      localStorage.setItem("afterElement", "");
      localStorage.setItem("draggedElement", "");
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
    e.dataTransfer.setData("draggedElement", JSON.stringify(element));
    localStorage.setItem("draggedElement", JSON.stringify(element));
    localStorage.setItem("draggedParent", JSON.stringify(parentElement));
  };

  const removeElementFromParent = (child, afterElement) => {
    try {
      let draggedParent = localStorage.getItem("draggedParent");
      localStorage.setItem("draggedParent", "");
      draggedParent = JSON.parse(draggedParent);

      if (afterElement && draggedParent._id === element._id) {
        let prevIndex = draggedParent.children_order.indexOf(child._id);
        let currentIndex = element.children_order.indexOf(afterElement);
        if (
          prevIndex === currentIndex ||
          draggedParent.children_order[prevIndex + 1] === afterElement
        )
          return 0;
      } else if (element.children_order.slice(-1)[0] === child._id) return 0;

      let prevParent = pageTree.body;
      child.path.forEach((item) => {
        prevParent = prevParent.children[item];
      });

      let prevIndex = prevParent.children_order.indexOf(child._id);
      prevParent.children_order.splice(prevIndex, 1);
      delete prevParent.children[child._id];
      return { prevParent, prevIndex };
    } catch (error) {}
  };

  const insertElement = (child, afterElement, prevParent) => {
    let update = { ...element };
    let index;
    if (prevParent === 0) return;

    if (!afterElement) {
      index = update.children_order.length;
      update.children_order.push(child._id);
    } else {
      index = update.children_order.indexOf(afterElement);
      update.children_order.splice(index, 0, child._id);
    }
    update.children[child._id] = child;

    addCommand({
      action: "moveElement",
      element: { ...child },
      parent: { ...update },
      index,
      ...prevParent,
    });
  };

  const handleDragend = (e) => {
    e.target.style.opacity = "";
  };

  return element ? (
    !nonClosingTags.includes(HTMLTag) ? (
      <HTMLTag
        title={HTMLTag}
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
        {element._id}
        {element.children_order.map((elem) => {
          element.children[elem].path = [...element.path, element._id];
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
