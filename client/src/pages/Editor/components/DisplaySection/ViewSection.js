import React, { useEffect, useRef, useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { StyleSheetManager } from "styled-components";
import { ContextMenuFR } from "../ContextMenu";
import { IframeElement } from "../IFrameElement";
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
      initialContent='<!DOCTYPE html><html><head><base target="_blank"><link href="/core.css" rel="stylesheet"></head><body><div id="container"></div><div id="scriptsContainer"><script src="/core.js"></script></div></body></html>'
      mountTarget="#container"
    >
      <FrameContextConsumer>
        {(frameContext) => (
          <StyleSheetManager target={frameContext.document.head}>
            <>
              <ContextMenuFR ref={contextRef} />
              <IframeElement contextMenu={contextMenu} element={site.body}>
                {renderElements(site.body, 1, contextMenu)}
              </IframeElement>
            </>
          </StyleSheetManager>
        )}
      </FrameContextConsumer>
    </Frame>
  ) : (
    ""
  );
}
