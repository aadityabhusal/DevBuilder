import React, { createContext, useState } from "react";

export const SelectedElementContext = createContext();

export const SelectedElementProvider = (props) => {
  const [selectedElement, setSelectedElement] = useState(null);

  const insertPasteElement = (child, contextMenu = {}) => {
    setSelectedElement((prev, prop) => {
      let temp = { ...prev };
      temp.children[child._id] = child;
      return temp;
    });
  };

  return (
    <SelectedElementContext.Provider
      value={{ selectedElement, setSelectedElement, insertPasteElement }}
    >
      {props.children}
    </SelectedElementContext.Provider>
  );
};
