import React from "react";
import { IframeElement } from "../IFrameElement";

export const renderElements = (
  element,
  level,
  contextMenu,
  setTarget,
  selectedElement
) => {
  return element.children.map((element, i) => {
    return (
      <IframeElement
        key={i}
        contextMenu={contextMenu}
        setTarget={setTarget}
        element={element}
        selectedElement={selectedElement}
      >
        {element.children &&
          renderElements(
            element,
            level + 1,
            contextMenu,
            setTarget,
            selectedElement
          )}
      </IframeElement>
    );
  });
};

// const addElement = () => {};
