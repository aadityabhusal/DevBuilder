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
  }

  return (
    <SiteTreeContext.Provider value={[siteTree, updateTree]}>
      {props.children}
    </SiteTreeContext.Provider>
  );
};
