import React, { useContext, useEffect, useRef, useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { StyleSheetManager } from "styled-components";
import {
  AfterElementLine,
  OutlineBox,
} from "../../../../components/editor/DisplaySection";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
import { getCSSText } from "../../../../utils/getCSSText";
import { ContextMenuFR } from "../ContextMenu";
import { IframeElement } from "./IFrameElement";

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
`;

export function ViewSection() {
  const contextRef = useRef();
  const [contextMenu, setContextMenu] = useState();
  const { pageTree } = useContext(PageTreeContext);

  useEffect(() => {
    if (pageTree) {
      setContextMenu(contextRef);
    }
  }, [pageTree]);

  return pageTree ? (
    <>
      <ContextMenuFR ref={contextRef} />
      <OutlineBox id="outlineBox"></OutlineBox>
      <AfterElementLine id="after-element-line"></AfterElementLine>
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
                  data={pageTree.body.children[pageTree.body.children_order[0]]}
                  parentElement={{}}
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
