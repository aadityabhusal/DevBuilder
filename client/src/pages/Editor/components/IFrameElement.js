import React, { useEffect, useState } from "react";

export function IframeElement({
  element,
  children,
  contextMenu,
  setTarget,
  selectedElement,
}) {
  const { tagName, text, style, classes, ...attributes } = element;
  element.classlist = classes ? classes.join(" ") : "";
  const [elementChildren, setElementChildren] = useState([]);

  useEffect(() => {
    if (children) {
      setElementChildren([children]);
    }
  }, [children]);

  const changeChildren = (newChild) => {
    setElementChildren((prev, prop) => {
      // console.log(prev);
      // prev.push(newChild);
      let temp = [...prev, newChild];
      console.log(temp);
      return temp;
    });
  };

  const HTMLTag = `${tagName}`;
  return (
    <HTMLTag
      onClick={(e) => {
        selectElement(e, element, contextMenu, setTarget);
        insertElement(changeChildren, selectedElement, contextMenu, setTarget);
        selectedElement = null;
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

const insertElement = (
  changeChildren,
  selectedElement,
  contextMenu,
  setTarget
) => {
  if (selectedElement) {
    changeChildren(
      <IframeElement
        contextMenu={contextMenu}
        setTarget={setTarget}
        element={selectedElement}
        selectedElement={selectedElement}
        key={setTarget.children ? setTarget.children.length : 0}
      ></IframeElement>
    );
  }
};

/* 
Warning: render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render.
*/
