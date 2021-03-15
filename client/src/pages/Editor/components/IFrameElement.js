import React from "react";

export function IframeElement({ element, children, contextMenu, setTarget }) {
  const { tagName, text, style, classes, ...attributes } = element;
  element.classlist = classes ? classes.join(" ") : "";
  const HTMLTag = `${tagName}`;
  return (
    <HTMLTag
      onClick={(e) => selectElement(e, element, contextMenu, setTarget)}
      onMouseOver={(e) => showHoverBox(e)}
      onMouseOut={(e) => hideHoverBox(e)}
      onContextMenu={(e) => openContextMenu(e, contextMenu)}
      className={"frame-element " + element.classlist}
      {...attributes}
    >
      {text}
      {children}
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

const selectElement = (e, element, contextMenu, setTarget) => {
  e.stopPropagation();
  closeContextMenu(e, contextMenu);
  setTarget(element);
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
