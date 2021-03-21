import React from "react";
import { IframeElement } from "../IFrameElement";

export const renderElements = (element, level, contextMenu) => {
  return element.children.map((element, i) => {
    return (
      <IframeElement key={i} contextMenu={contextMenu} element={element}>
        {element.children && renderElements(element, level + 1, contextMenu)}
      </IframeElement>
    );
  });
};
