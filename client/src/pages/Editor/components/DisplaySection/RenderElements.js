import React from "react";
import { IframeElement } from "../IFrameElement";

export const renderElements = (element, level, contextMenu) => {
  let list = Object.values(element.children);
  return (
    list.length &&
    list.map((element) => {
      if (!element._id) {
        element._id = performance.now().toString(36).replace(/\./g, "");
      }
      // console.log(element);
      return (
        <IframeElement
          key={element._id}
          contextMenu={contextMenu}
          element={element}
        >
          {Object.values(element.children) &&
            renderElements(element, level + 1, contextMenu)}
        </IframeElement>
      );
    })
  );
};
