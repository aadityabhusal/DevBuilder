import React, { useEffect, useRef, useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { StyleSheetManager } from "styled-components";
import { ContextMenuFR } from "../ContextMenu";
import { renderElements } from "./renderElements";

export function ViewSection({ site }) {
  const contextRef = useRef();
  const [contextMenu, setContextMenu] = useState();

  useEffect(() => {
    if (site) {
      setContextMenu(contextRef);
    }
  }, [site]);

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
              <ContextMenuFR ref={contextRef} />
              {renderElements(site.body, 1, contextMenu)}
            </>
          </StyleSheetManager>
        )}
      </FrameContextConsumer>
    </Frame>
  ) : (
    ""
  );
}
