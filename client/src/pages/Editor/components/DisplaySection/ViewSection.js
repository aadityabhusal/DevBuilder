import React, { useContext } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { StyleSheetManager } from "styled-components";
import {
  AfterElementLine,
  OutlineBox,
} from "../../../../components/editor/DisplaySection";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
import { getCSSText } from "../../../../utils/getCSSText";
import { ContextMenu } from "../ContextMenu";
import { IframeElement } from "./IFrameElement";

const baseStyle = `
.frame-content,
.frame-root,
body,
html {
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
`;

const toggleStyle = `
* {
  border: 1px solid #bdc3c7;
}
`;

export function ViewSection() {
  const { pageTree } = useContext(PageTreeContext);

  return pageTree ? (
    <>
      <ContextMenu />
      <OutlineBox id="outlineBox">
        <span></span>
      </OutlineBox>
      <AfterElementLine id="after-element-line"></AfterElementLine>
      <Frame
        id="iframe-view"
        style={{ flex: 1, border: "none" }}
        head={
          <>
            <style>{baseStyle}</style>
            <style id="toggleStylesheet">{toggleStyle}</style>
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
