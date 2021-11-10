import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { nanoid } from "nanoid";

export const PageTreeContext = createContext();

export const PageTreeProvider = (props) => {
  const [pageTree, setPageTree] = useState(null);
  const { authFetch } = useContext(UserContext);

  useEffect(() => {
    setPageTree((prev) => props.value);
  }, [props.value]);

  function removeElement(tree, elementId, elementPath, from) {
    let parent = tree.body;
    elementPath.forEach((item) => {
      parent = parent.children[item];
    });
    let element = { ...parent.children[elementId] };
    parent.children_order.splice(from, 1);
    delete parent.children[elementId];
    return element;
  }

  function insertElement(tree, element, targetPath, to) {
    let target = tree.body;
    targetPath.forEach((item) => {
      target = target.children[item];
    });
    if (!element._id) element._id = nanoid();
    element = updateChildrenPath(element, target);
    target.children_order.splice(to, 0, element._id);
    target.children[element._id] = element;
  }

  function moveElement(data, elementPath, targetPath, from, to) {
    let tree = { ...pageTree };
    let element = elementPath.length
      ? removeElement(tree, data._id, elementPath, from)
      : data;
    if (targetPath.length) {
      insertElement(tree, element, targetPath, to);
    }
    setPageTree((prev) => tree);
  }

  function updateChildrenPath(element, parent) {
    element.path = [...parent.path, parent._id];
    element.children_order &&
      element.children_order.forEach((elem, i) => {
        element.children[elem].path = [...element.path, element._id];
        element.children[elem] = updateChildrenPath(
          element.children[elem],
          element
        );
      });
    return element;
  }

  /* 
    - Changes should be property based
    - Each change must include a property - within a - block - within a - styleList
    - The style change must store the previous state of a property and the current applied property value
    - 
    - Since the pageTree will be updated on every change 
      - There is no need to apply styles to the head section directly (or maybe it is for changes made interactively )
      - (confusion) Not sure if the pageTree needs to updates when a block is created
      - When a property value will be changed, the previous values will be taken from the data passed to the component and command will be added to the pageTree
    .
  */

  // This is on the property level -- can we do it in the block level
  function stylePropertyChange(styleName, blockIndex, index, value) {
    let tree = { ...pageTree };
    let styleBlock = tree.head.style[styleName].styles[blockIndex];
    if (value) {
      value = JSON.parse(value);
      styleBlock.style.splice(index, 1, value);
    } else styleBlock.style.splice(index, 1);
    setPageTree((prev) => tree);
  }

  function styleBlockChange(styleName, blockIndex, blockValue) {
    let tree = { ...pageTree };
    let style = tree.head.style[styleName];
    if (blockValue) {
      blockValue = JSON.parse(blockValue);
      style.styles.splice(blockIndex, 1, blockValue);
    } else style.style.splice(blockIndex, 1);
    setPageTree((prev) => tree);
  }

  function updateStyles(name, action = "") {
    if (!pageTree.head.style.hasOwnProperty(name)) {
      pageTree.head.style[name] = { name, styles: [] };
    } else {
      if (action === "delete") {
        delete pageTree.head.style[name];
      } else {
        // Edit style page name case here
        // pageTree.head.style[name] = { name, styles: [] };
      }
    }
  }

  function updateTitle(value) {
    pageTree.head.title = value;
  }

  async function savePage() {
    await authFetch(`/api/page/${pageTree._id}`, "PUT", { body: pageTree });
  }

  return (
    <PageTreeContext.Provider
      value={{
        pageTree,
        setPageTree,
        updateStyles,
        updateTitle,
        savePage,
        moveElement,
        stylePropertyChange,
        styleBlockChange,
      }}
    >
      {props.children}
    </PageTreeContext.Provider>
  );
};
