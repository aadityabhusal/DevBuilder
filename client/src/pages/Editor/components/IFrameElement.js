import React, { useContext, useEffect, useState } from "react";

import { SelectedElementContext } from "../../../contexts/SelectedElementContext";

export function IframeElement({ element, children, contextMenu }) {
  const { tagName, text, style, classes, ...attributes } = element;
  element.classlist = classes ? classes.join(" ") : "";
  const [elementChildren, setElementChildren] = useState([]);
  const [selectedElement, setSelectedElement] = useContext(
    SelectedElementContext
  );

  useEffect(() => {
    if (children) {
      setElementChildren([children]);
    }
  }, [children]);

  const changeChildren = (newChild) => {
    setElementChildren((prev, prop) => {
      let temp = [...prev, newChild];
      return temp;
    });
  };

  const HTMLTag = `${tagName}`;
  return (
    <HTMLTag
      onClick={(e) =>
        selectElement(e, element, contextMenu, setSelectedElement)
      }
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        insertElement(
          changeChildren,
          e.dataTransfer.getData("draggedElement"),
          contextMenu,
          selectedElement
        );
      }}
      onDragOver={(e) => {
        e.preventDefault();
        selectElement(e, element, contextMenu, setSelectedElement);
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
  );
}

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

const insertElement = (
  changeChildren,
  draggedElement,
  contextMenu,
  selectedElement
) => {
  if (draggedElement) {
    changeChildren(
      <IframeElement
        contextMenu={contextMenu}
        element={JSON.parse(draggedElement)}
        key={selectedElement.children ? selectedElement.children.length : 0}
      ></IframeElement>
    );
  }
};
