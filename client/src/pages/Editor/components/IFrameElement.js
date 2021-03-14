import React from "react";

export function IframeElement({ element, text, children, style, ...props }) {
  const HTMLTag = `${element}`;
  return (
    <HTMLTag
      onClick={(e) => {
        e.stopPropagation();
        console.log("clicked");
      }}
      {...props}
    >
      {text ? text : ""}
      {children ? children : ""}
    </HTMLTag>
  );
}
