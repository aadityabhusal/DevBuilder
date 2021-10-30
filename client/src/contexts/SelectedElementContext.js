import React, { createContext, useContext, useState } from "react";
import { CommandContext } from "./CommandContext";

export const SelectedElementContext = createContext();

/* - The state update here caused the whole site and its every element to be re-rendered 
   - Because of which the elements dragged from a parent and dropped into another parent are re-appearing in the previous parent
   - The second problem only happens when the element is dropped not then an element is dragged and removed
*/

export const SelectedElementProvider = (props) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const { addCommand } = useContext(CommandContext);

  const insertPasteElement = (child, contextMenu = {}) => {
    let update = { ...selectedElement };
    update.children_order.push(child._id);
    update.children[child._id] = child;

    addCommand({
      action: "drop",
      element: { ...child },
      parent: { ...update },
    });

    setSelectedElement((prev) => update);
  };

  return (
    <SelectedElementContext.Provider
      value={{
        selectedElement,
        setSelectedElement,
        insertPasteElement,
      }}
    >
      {props.children}
    </SelectedElementContext.Provider>
  );
};
