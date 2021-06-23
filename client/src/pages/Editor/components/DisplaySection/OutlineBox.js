import React from "react";
import styled from "styled-components";

const OutlineContainer = styled.div`
  position: absolute;
  display: none;
  border: 1px solid #3498db;
  z-index: 100;
  pointer-events: none;
  user-select: none;
`;

export const OutlineElement = React.forwardRef(({}, ref) => {
  return <OutlineContainer ref={ref}></OutlineContainer>;
});

/* 
  IframeElement Code


  const showOutlineBox = (e) => {
    e.stopPropagation();
    outlineRef.current.style.display = "block";
  };

  const hideOutlineBox = (e) => {
    e.stopPropagation();
    outlineRef.current.style.display = "none";
  };


  <OutlineElement
    ref={outlineRef}
    element={elementRef}
    tag={tagName}
  ></OutlineElement>

*/
