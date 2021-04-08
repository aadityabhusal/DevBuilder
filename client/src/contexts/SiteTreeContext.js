import React, { createContext } from "react";

export const SiteTreeContext = createContext();

export const SiteTreeProvider = (props) => {
  const siteTree = props.value;
  const bodyChildren = siteTree.body.children;

  function updateTree(element, action = "", level = 0, site = bodyChildren) {
    if (element.path) {
      let lastItem = element.path[element.path.length - 1];
      if (site.hasOwnProperty(lastItem)) {
        if (action === "delete") {
          delete site[lastItem].children[element._id];
        } else {
          console.log(element);
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
    }
    /* 
      This save the whole site tree on every change
      Optimization needed here 
    */
    // temp
    // saveSite();
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
    <SiteTreeContext.Provider value={[siteTree, updateTree, saveSite]}>
      {props.children}
    </SiteTreeContext.Provider>
  );
};
