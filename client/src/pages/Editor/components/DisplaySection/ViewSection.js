import React, { useContext, useEffect, useRef, useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { StyleSheetManager } from "styled-components";
import { SiteTreeContext } from "../../../../contexts/SiteTreeContext";
import { ContextMenuFR } from "../ContextMenu";
import { IframeElement } from "../IFrameElement";
import { OutlineElement } from "../OutlineBox";

export function ViewSection() {
  const contextRef = useRef();
  const outlineRef = useRef();
  const [contextMenu, setContextMenu] = useState();
  const { siteTree } = useContext(SiteTreeContext);

  useEffect(() => {
    if (siteTree) {
      setContextMenu(contextRef);
    }
  }, [siteTree]);

  return siteTree ? (
    <>
      <ContextMenuFR ref={contextRef} />
      <OutlineElement ref={outlineRef}></OutlineElement>
      <Frame
        id="iframe-view"
        style={{ flex: 1, border: "none" }}
        head={
          <>
            <link type="text/css" rel="stylesheet" href="/core.css" />
            <style id="core-stylesheet"></style>
            {Object.entries(siteTree.head.styles).map((item) => (
              <style id={item[0] + "-stylesheet"} key={item[0]}>
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
                  data={
                    siteTree.body.children[
                      Object.keys(siteTree.body.children)[0]
                    ]
                  }
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
