import React, { createContext, useState } from "react";

export const PageTreeContext = createContext();

export const PageTreeProvider = (props) => {
  const [pageTree, setPageTree] = useState(props.value);
  const bodyChildren = pageTree.body.children;

  /* 
    This save the whole page tree on every change
    Optimization needed here 
  */
  function updateTree(element, action = "", level = 0, page = bodyChildren) {
    if (element.path) {
      let lastItem = element.path[element.path.length - 1];
      if (page.hasOwnProperty(lastItem)) {
        if (action === "delete") {
          delete page[lastItem].children[element._id];
        } else {
          page[lastItem].children[element._id] = element;
        }
      } else {
        updateTree(
          page[element.path[level]].children,
          element,
          action,
          ++level
        );
      }
    }
  }

  function updateStyles(name, action = "", value = "") {
    if (!pageTree.head.styles.hasOwnProperty(name)) {
      pageTree.head.styles[name] = "";
    } else {
      if (action === "delete") {
        delete pageTree.head.styles[name];
      } else {
        pageTree.head.styles[name] = value;
      }
    }
  }

  function updateTitle(value) {
    pageTree.head.title = value;
  }

  async function savePage() {
    await fetch(`/page/${pageTree._id}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageTree),
    });
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
