import React, { useEffect, useRef, useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { StyleSheetManager } from "styled-components";
import { ContextMenuFR } from "../ContextMenu";
import { IframeElement } from "../IFrameElement";
// import { renderElements } from "./renderElements";

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
      head={<link type="text/css" rel="stylesheet" href="/core.css" />}
    >
      <FrameContextConsumer>
        {(frameContext) => (
          <StyleSheetManager target={frameContext.document.head}>
            <>
              <ContextMenuFR ref={contextRef} />
              <IframeElement
                contextMenu={contextMenu}
                data={{ ...site.body, tagName: "div" }}
                removeFromParent={() => {}} //Changing the tagName from body to div because of frame-component rendering structure
              >
                {/* {renderElements(site.body, 1, contextMenu)} */}
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
