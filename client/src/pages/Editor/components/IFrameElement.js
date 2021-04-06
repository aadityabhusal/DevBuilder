import React, { useContext, useEffect, useState } from "react";
import { SiteTreeContext } from "../../../contexts/SiteTreeContext";
import { SelectedElementContext } from "../../../contexts/SelectedElementContext";

export function IframeElement({ data, removeFromParent, contextMenu }) {
  const { tagName, text, classes, attributes, ...rest } = data;
  data.classlist = data.classes ? data.classes.join(" ") : "";
  const nonClosingTags = ["img", "input", "hr", "br"];

  const [element, setElement] = useState();
  const [, setSelectedElement] = useContext(SelectedElementContext);
  const [, updateTree] = useContext(SiteTreeContext);

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
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromParent(element._id);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let data = JSON.parse(e.dataTransfer.getData("draggedElement"));
    if (!data._id) data._id = performance.now().toString(36).replace(/\./g, "");
    if (!data.path.length) data.path = [...element.path, element._id];
    insertElement(data, contextMenu);
    updateTree(data);
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

  const removeElementFromParent = (childId) => {
    setElement((prev, prop) => {
      let temp = { ...prev };
      delete temp.children[childId];
      return temp;
    });
  };
  const insertElement = (child, contextMenu) => {
    setElement((prev, prop) => {
      let temp = { ...prev };
      temp.children[child._id] = child;
      return temp;
    });
  };
  const HTMLTag = `${tagName}`;

  return element ? (
    !nonClosingTags.includes(tagName) ? (
      <HTMLTag
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
        className={"frame-element " + element.classlist}
        {...attributes}
      >
        {text}
        {Object.values(element.children).length
          ? Object.values(element.children).map((elem) => {
              elem.path = [...element.path, element._id];
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
    ) : (
      <HTMLTag
        draggable={true}
        onClick={handleClick}
        onDrag={handleDrag}
        onDragLeave={(e) => hideHoverBox(e)}
        onDragStart={handleDragStart}
        onMouseOver={(e) => showHoverBox(e)}
        onMouseOut={(e) => hideHoverBox(e)}
        onContextMenu={(e) => openContextMenu(e, contextMenu)}
        className={"frame-element " + element.classlist}
        readOnly={tagName === "input" ? true : false}
        {...attributes}
      />
    )
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
