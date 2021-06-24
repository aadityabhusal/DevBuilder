import React, { useContext, useEffect, useRef, useState } from "react";
import { CommandContext } from "../../../../contexts/CommandContext";
import { SelectedElementContext } from "../../../../contexts/SelectedElementContext";

export function IframeElement({
  data,
  removeFromParent,
  contextMenu,
  outlineBox,
}) {
  const { tagName, text, attributes } = data;
  const nonClosingTags = ["img", "video", "input", "hr", "br"];
  let elemAttributes = Object.assign({}, attributes);
  delete elemAttributes.class;

  const [element, setElement] = useState();
  const { setSelectedElement } = useContext(SelectedElementContext);
  const elementRef = useRef();
  const { addCommand } = useContext(CommandContext);

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
    let dragging = document
      .getElementById("iframe-view")
      .contentDocument.getElementById("dragging");
    if (dragging) {
      dragging.removeAttribute("id");
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
    showHoverBox(e);
  };

  const handleDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("draggedElement", JSON.stringify(element));
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
      console.log(temp.children);
      delete temp.children[child._id];
      console.log(temp.children);
      return temp;
    });
    addCommand({
      action: "drag",
      element: { ...child },
      parent: { ...element },
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
    });
  };

  const showHoverBox = (e) => {
    e.stopPropagation();
    let { top, left, width, height } = e.target.getBoundingClientRect();
    outlineBox.current.style.top = top - 1 + "px";
    outlineBox.current.style.left = left - 1 + "px";
    outlineBox.current.style.width = width + "px";
    outlineBox.current.style.height = height + "px";
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
        data-_id={element._id}
        draggable={true}
        onClick={handleClick}
        onDrag={handleDrag}
        onDragLeave={(e) => hideHoverBox(e)}
        onDragStart={handleDragStart}
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

/* 

  HORIZONTAL SORTING PROBLEM SOLUTION

  The feature for shifting elements by magin can be used to check
  if cursor is < 10-20% to the left or right then the element shifts by margin on that side
  If the cursor is in the center 80-60% the the program checks if the cursor is in the above part or the below part the add the margin above or below

*/

function getDragAfterElement(container, x, y) {
  const draggableElements = [...container.querySelectorAll(".frame-element")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offsetX = x - box.left - box.width / 2;
      /* Check if the element is horizontally or vertically placed here */
      let style = getComputedStyle(child);
      // if(style.display)  // Use regex here to match 'inline' etc

      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        child.id = "dragging";
        return { offset: offset, element: child };
      } else {
        child.removeAttribute("id");
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
