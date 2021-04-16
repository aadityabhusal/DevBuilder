import React, { useEffect, useRef, useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import styled, { StyleSheetManager } from "styled-components";
import { ContextMenuFR } from "../ContextMenu";
import { IframeElement } from "../IFrameElement";
import { OutlineElement } from "../OutlineBox";

export function ViewSection({ site }) {
  const contextRef = useRef();
  const outlineRef = useRef();
  const [contextMenu, setContextMenu] = useState();

  useEffect(() => {
    if (site) {
      setContextMenu(contextRef);
    }
  }, [site]);

  return site ? (
    <>
      <ContextMenuFR ref={contextRef} />
      <OutlineElement ref={outlineRef}></OutlineElement>
      <Frame
        id="iframe-view"
        style={{ flex: 1, border: "none" }}
        head={
          <>
            <link type="text/css" rel="stylesheet" href="/core.css" />
            {Object.entries(site.head.styles).map((item) => (
              <style id={item[0]} key={item[0]}>
                {item[1]}
              </style>
            ))}
          </>
        }
      >
        <FrameContextConsumer>
          {(frameContext) => (
            <StyleSheetManager target={frameContext.document.head}>
              <>
                <IframeElement
                  contextMenu={contextMenu}
                  outlineBox={outlineRef}
                  data={site.body.children[Object.keys(site.body.children)[0]]}
                  removeFromParent={() => {}} //Changing the tagName from body to div because of frame-component rendering structure
                ></IframeElement>
              </>
            </StyleSheetManager>
          )}
        </FrameContextConsumer>
      </Frame>
    </>
  ) : (
    ""
  );
}
