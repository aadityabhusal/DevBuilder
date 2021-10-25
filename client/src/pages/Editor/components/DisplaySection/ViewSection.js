import React, { useContext, useEffect, useRef, useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { StyleSheetManager } from "styled-components";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
import { getCSSText } from "../../../../utils/getCSSText";
import { ContextMenuFR } from "../ContextMenu";
import { IframeElement } from "./IFrameElement";
import { OutlineElement } from "./OutlineBox";

const coreStyle = `
* {
  border: 1px solid #bdc3c7;
  padding: 5px;
  margin: 2px;
}

.frame-content,
.frame-root,
body,
html {
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

.vertical-dragging {
  margin-top: 20px;
}

.horizontal-dragging {
  margin-left: 20px;
}

`;

export function ViewSection() {
  const contextRef = useRef();
  const outlineRef = useRef();
  const [contextMenu, setContextMenu] = useState();
  const { pageTree, navigatorTree } = useContext(PageTreeContext);

  useEffect(() => {
    if (pageTree) {
      setContextMenu(contextRef);
    }
  }, [pageTree]);

  return pageTree ? (
    <>
      <ContextMenuFR ref={contextRef} />
      <OutlineElement ref={outlineRef}></OutlineElement>
      <Frame
        id="iframe-view"
        style={{ flex: 1, border: "none" }}
        head={
          <>
            <style id="core-stylesheet">{coreStyle}</style>
            {Object.values(pageTree.head.style).map((item) => (
              <style id={item.name + "-stylesheet"} key={item.name}>
                {getCSSText(item.styles)}
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
                  navigator={navigatorTree}
                  data={
                    pageTree.body.children[
                      Object.keys(pageTree.body.children)[0]
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
