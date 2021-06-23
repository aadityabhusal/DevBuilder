import React from "react";
import { IframeElement } from "../IFrameElement";

export const renderElements = (element, level, contextMenu) => {
  // let list = Object.values(element.children);
  return (
    element.children_order.length &&
    element.children_order.map((elem) => {
      if (!element.children[elem]._id) {
        element.children[elem]._id = performance
          .now()
          .toString(36)
          .replace(/\./g, "");
      }
      return (
        <IframeElement
          key={element.children[elem]._id}
          contextMenu={contextMenu}
          element={element.children[elem]}
          parent={element}
        >
          {Object.values(element.children[elem].children).length &&
            renderElements(element.children[elem], level + 1, contextMenu)}
        </IframeElement>
      );
    })
  );
};
