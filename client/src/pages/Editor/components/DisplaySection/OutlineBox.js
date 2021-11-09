import { forwardRef, useEffect, useState } from "react";
import { OutlineBoxContainer } from "../../../../components/editor/DisplaySection";

function OutlineBox({ element, show }, ref) {
  const [display, setDisplay] = useState(false);
  useEffect(() => {}, [show]);

  return display ? (
    <OutlineBoxContainer id="outlineBox" ref={ref}>
      <span></span>
    </OutlineBoxContainer>
  ) : null;
}

export const OutlineBoxFR = forwardRef(OutlineBox);
