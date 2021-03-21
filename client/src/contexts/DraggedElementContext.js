import React, { createContext, useState } from "react";

export const DraggedElementContext = createContext();

export const DraggedElementProvider = (props) => {
  const [draggedElement, setDraggedElement] = useState(null);

  return (
    <DraggedElementContext.Provider value={[draggedElement, setDraggedElement]}>
      {props.children}
    </DraggedElementContext.Provider>
  );
};
