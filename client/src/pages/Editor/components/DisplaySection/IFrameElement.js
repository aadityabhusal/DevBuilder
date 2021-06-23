import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CommandContext } from "../../../../contexts/CommandContext";
// import { PageTreeContext } from "../../../../contexts/PageTreeContext";
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
  const elementRef = createRef();
  // const { updateTree } = useContext(PageTreeContext);
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
    // updateTree(data);
  };

  const handleDragOver = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    /* 
      Get the placement of the element to insert before here
      It could be done by giving the ref of the element (manage those propagation behaviour) to the getDragAfterElement
      Then get the id of the elementBefore from the children array
      Then add the dragged element before the element using insertElement function along with adding the children_order  
      */
    const afterElement = getDragAfterElement(elementRef.current, e.clientY);
    localStorage.setItem("afterElement", afterElement);
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
      let index = temp.children_order.indexOf(child._id);
      temp.children_order.splice(index, 1);
      delete temp.children[child._id];
      return temp;
    });
    addCommand({
      action: "drag",
      element: { ...child },
      parent: { ...element },
    });
  };

  const insertElement = (child, afterElement = null, contextMenu = {}) => {
    setElement((prev, prop) => {
      let temp = { ...prev };
      if (child._id in temp.children) {
        return temp;
      }
      if (afterElement == null) {
        temp.children_order.push(child._id);
      } else {
        let afterElementIndex = temp.children_order.indexOf(afterElement);
        temp.children_order.splice(afterElementIndex, 0, child._id);
      }
      temp.children[child._id] = child;
      localStorage.setItem("afterElement", "");
      return temp;
    });
    localStorage.setItem("afterElement", "");

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

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".frame-element")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child.dataset._id };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
