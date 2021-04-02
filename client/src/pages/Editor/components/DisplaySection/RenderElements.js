import React from "react";
import { IframeElement } from "../IFrameElement";

export const renderElements = (element, level, contextMenu) => {
  let list = Object.values(element.children);
  return (
    list.length &&
    list.map((elem) => {
      if (!elem._id) {
        elem._id = performance.now().toString(36).replace(/\./g, "");
      }
      return (
        <IframeElement
          key={elem._id}
          contextMenu={contextMenu}
          element={elem}
          parent={element}
        >
          {Object.values(elem.children).length &&
            renderElements(elem, level + 1, contextMenu)}
        </IframeElement>
      );
    })
  );
};
