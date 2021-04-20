import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { SelectedElementProvider } from "../../contexts/SelectedElementContext";
import { SiteTreeProvider } from "../../contexts/SiteTreeContext";

import { LeftSection, DisplaySection } from "./components";

const EditorContainer = styled.div`
  display: flex;
  max-height: calc(100vh - 45px);
  overflow: hidden;
`;

const DragLeftSection = styled.div`
  flex: 0 0 10px;
  cursor: w-resize;
  background-color: #444;
`;

export function EditorPage() {
  const { siteId } = useParams();
  const [site, setSite] = useState();
  const [page, setPage] = useState();
  const dragRef = useRef();

  useEffect(() => {
    getSite(siteId);
  }, [siteId]);

  async function getSite(siteId) {
    const response = await (await fetch(`/site/${siteId}`)).json();
    setSite(response);
    let page = response.pages.find((item) => item.pageName === "index.html");
    console.log(page);
    getPage(page.pageId);
  }
  async function getPage(pageId) {
    const response = await (await fetch(`/page/${pageId}`)).json();
    setPage(response);
    console.log("OK", response);
  }

  document.addEventListener("mouseup", (e) => {
    document.removeEventListener("mousemove", resizeLeftSection);
    if (document.getElementById("display-mask")) {
      document.getElementById("display-mask").style.display = "none";
    }
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

  return page ? (
    <EditorContainer>
      <SiteTreeProvider value={page}>
        <SelectedElementProvider>
          <LeftSection ref={dragRef} />
          <DragLeftSection onMouseDown={handleResize}></DragLeftSection>
          <DisplaySection site={page} />
        </SelectedElementProvider>
      </SiteTreeProvider>
    </EditorContainer>
  ) : null;
}
