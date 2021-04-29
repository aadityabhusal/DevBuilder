import React, { createContext, useState } from "react";

export const CopyPasteContext = createContext();

export const CopyPasteProvider = (props) => {
  const [pasteData, setPasteData] = useState(null);

  function pasteElement() {}

  function dropElement() {}

  return (
    <CopyPasteContext.Provider value={{ pasteData, setPasteData }}>
      {props.children}
    </CopyPasteContext.Provider>
  );
};
