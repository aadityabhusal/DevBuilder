import React, { useContext, useEffect, useState } from "react";
import { SelectedElementContext } from "../../../contexts/SelectedElementContext";

export function IframeElement({ data, removeFromParent, contextMenu }) {
  const { tagName, text, classes, ...attributes } = data;
  data.classlist = data.classes ? data.classes.join(" ") : "";

  const [element, setElement] = useState();
  const [childrenList, setChildrenList] = useState();
  const [, setSelectedElement] = useContext(SelectedElementContext);
  console.log(tagName);
  useEffect(() => {
    if (data) {
      setElement((prev, prop) => data);
      setChildrenList(Object.values(data.children));
    }
  }, [data]);

  const handleClick = (e) => {
    e.stopPropagation();
    closeContextMenu(e, contextMenu);
    setSelectedElement(element);
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.display = "none";
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let data = JSON.parse(e.dataTransfer.getData("draggedElement"));
    if (!data._id) data._id = performance.now().toString(36).replace(/\./g, "");
    insertElement(data, contextMenu);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    showHoverBox(e);
  };
  const handleDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("draggedElement", JSON.stringify(element));
  };
  const handleDragEnd = (e) => {
    e.stopPropagation();
    removeFromParent(element._id);
  };
  /* 
  Problem in insertElement & removeElementFromParent: 
    1. Both perform multiple state changes
    2. Function breaks when element dropped into itself and its parent
  */
  const removeElementFromParent = (childId) => {
    setElement((prev, prop) => {
      delete prev.children[childId];
      return prev;
    });
    setChildrenList((prev, prop) => {
      return prev.filter((item) => item._id !== childId);
    });
  };
  const insertElement = (child, contextMenu) => {
    if (!element.children.hasOwnProperty(child._id)) {
      setElement((prev, prop) => {
        prev.children[child._id] = child;
        return prev;
      });
      setChildrenList((prev, prop) => {
        return [...prev, child];
      });
    }
  };

  const HTMLTag = `${tagName}`;
  return element ? (
    <HTMLTag
      draggable={true}
      onClick={handleClick}
      onDrag={handleDrag}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={(e) => hideHoverBox(e)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseOver={(e) => showHoverBox(e)}
      onMouseOut={(e) => hideHoverBox(e)}
      onContextMenu={(e) => openContextMenu(e, contextMenu)}
      className={"frame-element " + element.classlist}
      {...attributes}
    >
      {text}
      {childrenList.length
        ? childrenList.map((elem) => {
            return (
              <IframeElement
                key={elem._id}
                contextMenu={contextMenu}
                data={elem}
                removeFromParent={removeElementFromParent}
              ></IframeElement>
            );
          })
        : null}
    </HTMLTag>
  ) : null;
}

const openContextMenu = (e, contextMenu) => {
  e.preventDefault();
  contextMenu.current.style.display = "flex";
  contextMenu.current.style.top = e.clientY + "px";
  contextMenu.current.style.left = e.clientX + "px";
  return false;
};
const closeContextMenu = (e, contextMenu) => {
  contextMenu.current.style.display = "none";
};
const showHoverBox = (e) => {
  e.stopPropagation();
  e.target.style.borderColor = "#3498db";
};
const hideHoverBox = (e) => {
  e.stopPropagation();
  e.target.style.borderColor = "#ecf0f1"; //or transparent
};
