import React, { useContext, useEffect, useRef, useState } from "react";
import {
  closeContextMenu,
  getDragAfterElement,
  nestingValidation,
} from "../../../../utils";
import { CommandContext } from "../../../../contexts/CommandContext";
import { SelectedElementContext } from "../../../../contexts/SelectedElementContext";
const nonClosingTags = ["img", "video", "input", "hr", "br"];

/* 
  - See if I could use translate in showHoverBox function

  - Cannot keep addCommand inside these function because these functions will be called while doing undo and redo causing the command to be added to the history again
*/

export function IframeElement({
  data,
  removeFromParent,
  contextMenu,
  outlineBox,
}) {
  const [element, setElement] = useState();
  const elementRef = useRef();
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

  const handleDrag = (e) => {
    e.stopPropagation();
    removeFromParent(element);
  };

  const handleDrop = (e) => {
    e.stopPropagation();
    let data = JSON.parse(e.dataTransfer.getData("draggedElement"));
    if (!data._id) data._id = performance.now().toString(36).replace(/\./g, "");
    if (!data.path.length) data.path = [...element.path, element._id];

    let afterElement = localStorage.getItem("afterElement");
    insertElement(data, afterElement);
    localStorage.setItem("afterElement", "");

    document
      .getElementById("iframe-view")
      .contentDocument.querySelectorAll(
        ".vertical-dragging, .horizontal-dragging"
      )
      .forEach((item) => {
        item.classList.remove("vertical-dragging", "horizontal-dragging");
      });
  };

  const handleDragOver = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const afterElement = getDragAfterElement(
      elementRef.current,
      e.clientX,
      e.clientY
    );
    localStorage.setItem(
      "afterElement",
      afterElement ? afterElement.dataset._id : ""
    );

    let data = JSON.parse(localStorage.getItem("draggedElement"));
    if (
      nestingValidation(
        elementRef.current.tagName,
        data.tagName,
        nonClosingTags
      )
    ) {
      showHoverBox(e);
    } else {
      showHoverBox(e, "#e74c3c");
    }
  };

  const handleDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("draggedElement", JSON.stringify(element));
    localStorage.setItem("draggedElement", JSON.stringify(element));
  };

  const removeElementFromParent = (child) => {
    let update = { ...element };
    let index = update.children_order.indexOf(child._id);
    update.children_order.splice(index, 1);
    delete update.children[child._id];

    addCommand({
      action: "drag",
      element: { ...child },
      parent: { ...update },
      index: update.children_order.indexOf(child._id),
    });
    setElement((prev) => update);
  };

  const insertElement = (child, afterElement) => {
    let update = { ...element };
    if (!afterElement) {
      update.children_order.push(child._id);
    } else {
      let index = update.children_order.indexOf(afterElement);
      update.children_order.splice(index, 0, child._id);
    }
    update.children[child._id] = child;

    addCommand({
      action: "drop",
      element: { ...child },
      parent: { ...update },
      index: update.children_order.indexOf(child._id),
    });
    setElement((prev) => update);
  };

  const showHoverBox = (e, color = "#3498db") => {
    e.stopPropagation();
    let { top, left, width, height } = e.target.getBoundingClientRect();
    outlineBox.current.style.top = top - 1 + "px";
    outlineBox.current.style.left = left - 1 + "px";
    outlineBox.current.style.width = width + "px";
    outlineBox.current.style.height = height + "px";
    outlineBox.current.style.border = "1px solid" + color;
    outlineBox.current.style.display = "block";
  };

  const hideHoverBox = (e) => {
    e.stopPropagation();
    outlineBox.current.style.display = "none";
  };

  return element ? (
    !nonClosingTags.includes(HTMLTag) ? (
      <HTMLTag
        title={HTMLTag}
        ref={elementRef}
        draggable={true}
        onClick={handleClick}
        onDrag={handleDrag}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={(e) => hideHoverBox(e)}
        onDragStart={handleDragStart}
        onMouseOver={(e) => showHoverBox(e)}
        onMouseOut={(e) => hideHoverBox(e)}
        onContextMenu={(e) => openContextMenu(e, contextMenu)}
        className={"frame-element " + element.attributes["class"]}
        data-_id={element._id}
        {...elemAttributes}
      >
        {element.text.join("")}
        {element.children_order.length
          ? element.children_order.map((elem) => {
              element.children[elem].path = [...element.path, element._id];
              return (
                <IframeElement
                  key={element.children[elem]._id}
                  contextMenu={contextMenu}
                  outlineBox={outlineBox}
                  data={element.children[elem]}
                  removeFromParent={removeElementFromParent}
                ></IframeElement>
              );
            })
          : null}
      </HTMLTag>
    ) : (
      <HTMLTag
        title={HTMLTag}
        ref={elementRef}
        data-_id={element._id}
        draggable={true}
        onClick={handleClick}
        onDrag={handleDrag}
        onDragLeave={(e) => hideHoverBox(e)}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onMouseOver={(e) => showHoverBox(e)}
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
