import React, { createContext, useContext, useState } from "react";
import { CommandContext } from "./CommandContext";

export const SelectedElementContext = createContext();

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
