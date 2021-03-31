import React from "react";
import { IframeElement } from "../IFrameElement";

export const renderElements = (element, level, contextMenu) => {
  return (
    element.children &&
    element.children.map((element, i) => {
      element._id =
        element._id || performance.now().toString(36).replace(/\./g, "");
      return (
        <IframeElement
          key={element._id}
          contextMenu={contextMenu}
          element={element}
        >
          {element.children && renderElements(element, level + 1, contextMenu)}
        </IframeElement>
      );
    })
  );
};
