import React, { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const PageTreeContext = createContext();

export const PageTreeProvider = (props) => {
  const [pageTree, setPageTree] = useState(props.value);
  const { authFetch } = useContext(UserContext);

  function updateTree(
    element,
    action = "",
    level = 0,
    site = pageTree.body.children
  ) {
    if (level === element.path.length - 1) {
      let lastItem = element.path[element.path.length - 1];
      if (site.hasOwnProperty(lastItem)) {
        action === "delete"
          ? delete site[lastItem].children[element._id]
          : (site[lastItem].children[element._id] = element);
      }
      return;
    } else {
      updateTree(
        element,
        action,
        level + 1,
        site[element.path[level]].children
      );
    }
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
        updateTree,
        updateStyles,
        updateTitle,
        savePage,
      }}
    >
      {props.children}
    </PageTreeContext.Provider>
  );
};
