import React, { useContext, useEffect, useState } from "react";

import { SelectedElementContext } from "../../../contexts/SelectedElementContext";
import { renderElements } from "./DisplaySection/renderElements";

export function IframeElement({ element, children, contextMenu }) {
  const { tagName, text, style, classes, ...attributes } = element;
  element.classlist = classes ? classes.join(" ") : "";

  const [shouldDisplay, setShouldDisplay] = useState(true);
  const [elementChildren, setElementChildren] = useState([]);
  const [, setSelectedElement] = useContext(SelectedElementContext);

  useEffect(() => {
    if (children) {
      setElementChildren(children);
    }
  }, [children]);

  const changeChildren = (newChild) => {
    setElementChildren((prev, prop) => {
      return [...prev, newChild];
    });
  };

  const HTMLTag = `${tagName}`;
  return (
    shouldDisplay && (
      <HTMLTag
        draggable={true}
        onClick={(e) => {
          selectElement(e, element, contextMenu, setSelectedElement);
          if (e.target.nodeName === "A") {
            e.preventDefault();
          }
        }}
        onDrag={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.target.style.display = "none";
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          let data = JSON.parse(e.dataTransfer.getData("draggedElement"));
          insertElement(changeChildren, data, contextMenu);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.target.style.borderColor = "#3498db";
        }}
        onDragLeave={(e) => (e.target.style.borderColor = "#ecf0f1")}
        onDragStart={(e) => {
          e.stopPropagation();
          let data = element;
          data.children = [...loopThroughChildren(elementChildren)];
          e.dataTransfer.setData("draggedElement", JSON.stringify(data));
        }}
        onDragEnd={(e) => {
          e.stopPropagation();
          // e.target.parentElement.removeChild(e.target);
          setShouldDisplay(false);
        }}
        onMouseOver={(e) => showHoverBox(e)}
        onMouseOut={(e) => hideHoverBox(e)}
        onContextMenu={(e) => openContextMenu(e, contextMenu)}
        className={"frame-element " + element.classlist}
        {...attributes}
      >
        {text}
        {elementChildren}
      </HTMLTag>
    )
  );
}

const loopThroughChildren = (children) => {
  return children.map((item) => item.props.element);
};

const openContextMenu = (e, contextMenu) => {
  e.preventDefault();
  contextMenu.current.style.display = "flex";
  contextMenu.current.style.top = e.clientY + "px";
  contextMenu.current.style.left = e.clientX + "px";
  return false;
};

const selectElement = (e, element, contextMenu, setSelectedElement) => {
  e.stopPropagation();
  closeContextMenu(e, contextMenu);
  setSelectedElement(element);
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
  e.target.style.borderColor = "#ecf0f1";
};

const insertElement = (changeChildren, draggedElement, contextMenu) => {
  if (draggedElement) {
    let random = `${new Date().getTime().toString().slice(-5, -1)}${Math.floor(
      Math.random() * 1000
    )}`;
    changeChildren(
      <IframeElement
        contextMenu={contextMenu}
        element={draggedElement}
        key={random}
      >
        {draggedElement.children &&
          renderElements(draggedElement, draggedElement.level + 1, contextMenu)}
      </IframeElement>
    );
  }
};
