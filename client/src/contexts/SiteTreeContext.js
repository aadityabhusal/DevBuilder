import React, { createContext, useState } from "react";

export const SiteTreeContext = createContext();

export const SiteTreeProvider = (props) => {
  const [siteTree, setSiteTree] = useState(props.value);
  return (
    <SiteTreeContext.Provider value={{ siteTree, setSiteTree }}>
      {props.children}
    </SiteTreeContext.Provider>
  );
};
