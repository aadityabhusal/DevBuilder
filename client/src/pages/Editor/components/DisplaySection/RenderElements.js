import React from "react";
import { IframeElement } from "../IFrameElement";

export const RenderElements = ({ element, level, contextMenu, setTarget }) => {
  return element.children.map((element, i) => {
    return (
      <IframeElement
        key={i}
        contextMenu={contextMenu}
        setTarget={setTarget}
        element={element}
      >
        {element.children && (
          <RenderElements
            element={element}
            level={level + 1}
            contextMenu={contextMenu}
            setTarget={setTarget}
          />
        )}
      </IframeElement>
    );
  });
};

// const addElement = () => {};
