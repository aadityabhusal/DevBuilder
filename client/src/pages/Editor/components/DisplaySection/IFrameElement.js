import React, { useContext, useEffect, useState } from "react";
import { CommandContext } from "../../../../contexts/CommandContext";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
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
  const { updateTree } = useContext(PageTreeContext);
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
    insertElement(data);
    // updateTree(data);
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

  /* 
  Cannot keep addCommand inside these function 
  because these functions will be called while doing undo and redo
  causing the command to be added to the history again
*/

  const removeElementFromParent = (child) => {
    setElement((prev, prop) => {
      let temp = { ...prev };
      delete temp.children[child._id];
      return temp;
    });
    addCommand({
      action: "drag",
      element: { ...child },
      parent: { ...element },
    });
  };

  const insertElement = (child, contextMenu = {}) => {
    setElement((prev, prop) => {
      let temp = { ...prev };
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
        {...elemAttributes}
      >
        {text.join(" ")}
        {Object.values(element.children).length
          ? Object.values(element.children).map((elem) => {
              elem.path = [...element.path, element._id];
              return (
                <IframeElement
                  key={elem._id}
                  contextMenu={contextMenu}
                  outlineBox={outlineBox}
                  data={elem}
                  removeFromParent={removeElementFromParent}
                ></IframeElement>
              );
            })
          : null}
      </HTMLTag>
    ) : (
      <HTMLTag
        title={HTMLTag}
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
