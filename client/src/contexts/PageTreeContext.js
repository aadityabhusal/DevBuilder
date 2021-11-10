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

  function styleBlockChange(styleName, blockId, blockValue) {
    let tree = { ...pageTree };
    let style = tree.head.style[styleName];
    let blockIndex = tree.head.style[styleName].styles.findIndex(
      (item) => item._id === blockId
    );
    if (blockValue) {
      blockValue = JSON.parse(blockValue);
      style.styles.splice(blockIndex, 1, blockValue);
    } else style.styles.splice(blockIndex, 1);
    setPageTree((prev) => tree);
  }

  function moveStyleBlock(styleName, styleBlock, from, to) {
    let tree = { ...pageTree };
    let style = tree.head.style[styleName];
    if (from) style.styles.splice(from, 1);
    if (to) style.styles.splice(to, 1, styleBlock);
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
        styleBlockChange,
        moveStyleBlock,
      }}
    >
      {props.children}
    </PageTreeContext.Provider>
  );
};
