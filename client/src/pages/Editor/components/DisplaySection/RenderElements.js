import React from "react";
import { IframeElement } from "../IFrameElement";

export const RenderElements = ({ children, level, contextMenu }) => {
  return children.map(({ children, classes, ...item }, i) => {
    return (
      <IframeElement
        key={i}
        contextMenu={contextMenu}
        className={classes ? "frame-element " + classes.join(" ") : ""}
        {...item}
      >
        {children && (
          <RenderElements
            children={children}
            level={level + 1}
            contextMenu={contextMenu}
          />
        )}
      </IframeElement>
    );
  });
};

const addElement = () => {};
