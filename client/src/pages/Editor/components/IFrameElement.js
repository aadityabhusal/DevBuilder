import React from "react";

export function IframeElement({
  element,
  text,
  children,
  style,
  contextMenu,
  ...props
}) {
  const HTMLTag = `${element}`;
  return (
    <HTMLTag
      onClick={(e) => closeContextMenu(e, contextMenu)}
      onMouseOver={(e) => {
        e.stopPropagation();
        e.target.style.borderColor = "#3498db";
      }}
      onMouseOut={(e) => {
        e.stopPropagation();
        e.target.style.borderColor = "#bdc3c7";
      }}
      onContextMenu={(e) => openContextMenu(e, contextMenu)}
      {...props}
    >
      {text ? text : ""}
      {children ? children : ""}
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

const closeContextMenu = (e, contextMenu) => {
  contextMenu.current.style.display = "none";
};
