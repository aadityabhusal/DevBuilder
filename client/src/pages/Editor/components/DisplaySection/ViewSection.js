import React, { useEffect, useRef, useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { useParams } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import { ContextMenuFR } from "../ContextMenu";
import { RenderElements } from "./RenderElements";
/* 
  You can use React.createElement
  Using recursion, you can add more elements in side element in the children parameter of React.createElement
  https://stackoverflow.com/questions/31234500/create-react-component-dynamically
*/

export function ViewSection({ children, ...props }) {
  const { pageId } = useParams();
  const [site, setSite] = useState();
  const contextRef = useRef();
  const [contextMenu, setContextMenu] = useState();
  useEffect(() => {
    (async (pageId) => {
      const { site } = await (await fetch(`/page/${pageId}`)).json();
      setSite(site);
      setContextMenu(contextRef);
    })(pageId);
  }, [pageId]);

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
              <RenderElements
                children={site.body.children}
                level={1}
                contextMenu={contextMenu}
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
