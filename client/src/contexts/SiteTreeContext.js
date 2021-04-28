import React, { createContext, useState } from "react";

export const SiteTreeContext = createContext();

export const SiteTreeProvider = (props) => {
  const [siteTree, setSiteTree] = useState(props.value);
  const bodyChildren = siteTree.body.children;

  /* 
    This save the whole site tree on every change
    Optimization needed here 
  */
  function updateTree(element, action = "", level = 0, site = bodyChildren) {
    if (element.path) {
      let lastItem = element.path[element.path.length - 1];
      if (site.hasOwnProperty(lastItem)) {
        if (action === "delete") {
          delete site[lastItem].children[element._id];
        } else {
          site[lastItem].children[element._id] = element;
        }
      } else {
        updateTree(
          site[element.path[level]].children,
          element,
          action,
          ++level
        );
      }
      saveSite();
    }
  }

  function updateStyles(name, action = "", value = "") {
    if (!siteTree.head.styles.hasOwnProperty(name)) {
      siteTree.head.styles[name] = "";
    } else {
      if (action === "delete") {
        delete siteTree.head.styles[name];
      } else {
        siteTree.head.styles[name] = value;
      }
    }
  }

  async function saveSite() {
    await fetch(`/page/${siteTree._id}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(siteTree),
    });
  }

  return (
    <SiteTreeContext.Provider
      value={{ siteTree, setSiteTree, updateTree, updateStyles, saveSite }}
    >
      {props.children}
    </SiteTreeContext.Provider>
  );
};
