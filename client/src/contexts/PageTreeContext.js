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
    element.path = targetPath;
    target.children_order.splice(to, 0, element._id);
    target.children[element._id] = element;
  }

  function moveElement(data, elementPath, targetPath, from, to) {
    let tree = { ...pageTree };
    let element = data._id
      ? removeElement(tree, data._id, elementPath, from)
      : data;
    if (targetPath) {
      insertElement(tree, element, targetPath, to);
    }
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
      }}
    >
      {props.children}
    </PageTreeContext.Provider>
  );
};
