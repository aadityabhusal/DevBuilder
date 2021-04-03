import React, { createContext, useState } from "react";

export const SiteTreeContext = createContext();

export const SiteTreeProvider = (props) => {
  const [siteTree, setSiteTree] = useState(null);

  function updateTree(site, element, path, action = "", level = 0) {
    if (level === path.length - 1) {
      let lastItem = path[path.length - 1];
      if (site.hasOwnProperty(lastItem)) {
        action === "delete"
          ? delete site[lastItem].children[element._id]
          : (site[lastItem].children[element._id] = element);
      }
      return;
    } else {
      updateTree(site[path[level]].children, element, path, action, ++level);
    }
  }

  return (
    <SiteTreeContext.Provider value={[siteTree, updateTree]}>
      {props.children}
    </SiteTreeContext.Provider>
  );
};
