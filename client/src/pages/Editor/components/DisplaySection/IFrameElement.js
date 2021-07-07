import React, { useContext, useEffect, useRef, useState } from "react";
import { CommandContext } from "../../../../contexts/CommandContext";
import { SelectedElementContext } from "../../../../contexts/SelectedElementContext";
const nonClosingTags = ["img", "video", "input", "hr", "br"];

export function IframeElement({
  data,
  removeFromParent,
  contextMenu,
  outlineBox,
}) {
  const { tagName, text, attributes } = data;
  let elemAttributes = Object.assign({}, attributes);
  delete elemAttributes.class;

  const [element, setElement] = useState();
  const { setSelectedElement } = useContext(SelectedElementContext);
  const elementRef = useRef();
  const { addCommand } = useContext(CommandContext);
  console.log("OK");
  useEffect(() => {
    if (data) {
      setElement((prev, prop) => data);
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
    e.preventDefault();
    e.stopPropagation();
    removeFromParent(element);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let data = JSON.parse(e.dataTransfer.getData("draggedElement"));
    if (!data._id) data._id = performance.now().toString(36).replace(/\./g, "");
    if (!data.path.length) data.path = [...element.path, element._id];
    let afterElement = localStorage.getItem("afterElement");
    insertElement(data, afterElement);
    localStorage.setItem("afterElement", "");

    let vdragging = document
      .getElementById("iframe-view")
      .contentDocument.getElementById("vertical-dragging");
    if (vdragging) {
      vdragging.removeAttribute("id");
    }

    let hdragging = document
      .getElementById("iframe-view")
      .contentDocument.getElementById("horizontal-dragging");
    if (hdragging) {
      hdragging.removeAttribute("id");
    }
    // updateTree(data);
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
    if (nestingValidation(elementRef.current.tagName, data.tagName)) {
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

  /* 
  Cannot keep addCommand inside these function 
  because these functions will be called while doing undo and redo
  causing the command to be added to the history again

  problem
  two sibling elements getting removed at once every time after the second  dragging of elements
*/

  const removeElementFromParent = (child) => {
    setElement((prev, prop) => {
      let temp = { ...prev };
      let index = temp.children_order.indexOf(child._id);
      temp.children_order.splice(index, 1);
      delete temp.children[child._id];
      return temp;
    });
    addCommand({
      action: "drag",
      element: { ...child },
      parent: { ...element },
      index: element.children_order.indexOf(child._id),
    });
  };

  const insertElement = (child, afterElement, contextMenu = {}) => {
    setElement((prev, prop) => {
      let temp = { ...prev };
      if (child._id in temp.children) {
        return temp;
      }
      if (!afterElement) {
        temp.children_order.push(child._id);
      } else {
        let afterElementIndex = temp.children_order.indexOf(afterElement);
        temp.children_order.splice(afterElementIndex, 0, child._id);
      }
      temp.children[child._id] = child;
      return temp;
    });

    addCommand({
      action: "drop",
      element: { ...child },
      parent: { ...element },
      index: element.children_order.indexOf(child._id),
    });
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

  const HTMLTag = `${tagName}`;

  return element ? (
    !nonClosingTags.includes(tagName) ? (
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
        className={"frame-element " + attributes["class"]}
        data-_id={element._id}
        {...elemAttributes}
      >
        {text.join("")}
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
        className={"frame-element " + attributes["class"]}
        readOnly={tagName === "input" ? true : false}
        controls={tagName === "video" ? true : false}
        {...elemAttributes}
      />
    )
  ) : null;
}

const closeContextMenu = (e, contextMenu) => {
  contextMenu.current.style.display = "none";
};

function getDragAfterElement(container, x, y) {
  const draggableElements = [...container.querySelectorAll(".frame-element")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offsetTop = y < box.top + box.height * 0.2;
      const offsetLeft = x < box.left + box.width * 0.2;
      /* Needs Some Improvement */
      if (offsetTop && offsetTop > closest.offset) {
        child.id = "vertical-dragging";
        return { element: child, offset: offsetTop };
      } else if (offsetLeft && offsetLeft > closest.offset && y < box.bottom) {
        child.id = "horizontal-dragging";
        return { element: child, offset: offsetLeft };
      } else {
        child.removeAttribute("id");
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function nestingValidation(parentTag, childTag) {
  let tags = {
    p: ["p"],
    li: ["li"],
    a: ["a"],
    button: ["button"],
  };
  let parent = parentTag.toLowerCase();

  if (nonClosingTags.includes(parent)) {
    return false;
  }

  if (tags.hasOwnProperty(parent) && tags[parent].includes(childTag)) {
    return false;
  }
  return true;
}
