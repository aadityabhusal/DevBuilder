import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { SelectedElementProvider } from "../../contexts/SelectedElementContext";
import { SiteTreeProvider } from "../../contexts/SiteTreeContext";

import { LeftSection, DisplaySection } from "./components";

const EditorContainer = styled.div`
  display: flex;
  max-height: 100vh;
  overflow: hidden;
`;

const DragLeftSection = styled.div`
  flex: 0 0 10px;
  cursor: w-resize;
  background-color: #444;
`;

export function EditorPage() {
  const { pageId } = useParams();
  const [site, setSite] = useState();
  const dragRef = useRef();

  useEffect(() => {
    (async (pageId) => {
      const response = await (await fetch(`/page/${pageId}`)).json();
      setSite(response);
    })(pageId);
  }, [pageId]);

  document.addEventListener("mouseup", (e) => {
    document.removeEventListener("mousemove", resizeLeftSection);
    document.getElementById("display-mask").style.display = "none";
  });

  const handleResize = (e) => {
    document.addEventListener("mousemove", resizeLeftSection);
  };

  const resizeLeftSection = (e) => {
    if (dragRef.current.clientWidth >= 400) {
      document.getElementById("display-mask").style.display = "block";
      dragRef.current.style.flex = `0 0 ${e.pageX}px`;
      document.getElementsByClassName(
        "monaco-editor"
      )[0].style.width = `${e.pageX}px`;
    } else {
      dragRef.current.style.flex = `0 0 400px`;
      document.removeEventListener("mousemove", resizeLeftSection);
    }
  };

  return site ? (
    <EditorContainer>
      <SiteTreeProvider value={site}>
        <SelectedElementProvider>
          <LeftSection ref={dragRef} />
          <DragLeftSection onMouseDown={handleResize}></DragLeftSection>
          <DisplaySection site={site} />
        </SelectedElementProvider>
      </SiteTreeProvider>
    </EditorContainer>
  ) : null;
}
