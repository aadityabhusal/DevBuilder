import React, { createContext, useState } from "react";
export const SelectedElementContext = createContext();

export const SelectedElementProvider = (props) => {
  const [selectedElement, setSelectedElement] = useState(null);
  return (
    <SelectedElementContext.Provider
      value={{
        selectedElement,
        setSelectedElement,
      }}
    >
      {props.children}
    </SelectedElementContext.Provider>
  );
};
