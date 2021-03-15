import React, { useEffect, useRef, useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { StyleSheetManager } from "styled-components";
import { ContextMenuFR } from "../ContextMenu";
import { RenderElements } from "./RenderElements";
/* 
  You can use React.createElement
  Using recursion, you can add more elements in side element in the children parameter of React.createElement
  https://stackoverflow.com/questions/31234500/create-react-component-dynamically
*/

export function ViewSection({ selectTarget, site }) {
  const contextRef = useRef();
  const [contextMenu, setContextMenu] = useState();
  const [target, setTarget] = useState();

  useEffect(() => {
    if (site) {
      setContextMenu(contextRef);
      if (target) {
        selectTarget(target);
      }
    }
  }, [site, selectTarget, target]);

  return site ? (
    <Frame
      style={{ flex: 1, border: "none" }}
      initialContent='<!DOCTYPE html><html><head><base target="_blank"><link href="/core.css" rel="stylesheet"></head><body id="body"><script src="/core.js"></script></body></html>'
      mountTarget="#body"
    >
      <FrameContextConsumer>
        {(frameContext) => (
          <StyleSheetManager target={frameContext.document.head}>
            <>
              <ContextMenuFR ref={contextRef} target={target} />
              <RenderElements
                element={site.body}
                level={1}
                contextMenu={contextMenu}
                setTarget={setTarget}
              />
            </>
          </StyleSheetManager>
        )}
      </FrameContextConsumer>
    </Frame>
  ) : (
    ""
  );
}
