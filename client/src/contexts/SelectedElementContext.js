import React, { createContext, useState } from "react";

export const SelectedElementContext = createContext();

/* - The state update here caused the whole site and its every element to be re-rendered 
   - Because of which the elements dragged from a parent and dropped into another parent are re-appearing in the previous parent
   - The second problem only happens when the element is dropped not then an element is dragged and removed
*/

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
