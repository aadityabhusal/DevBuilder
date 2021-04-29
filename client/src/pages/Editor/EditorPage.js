import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { SelectedElementProvider } from "../../contexts/SelectedElementContext";
import { SiteTreeProvider } from "../../contexts/SiteTreeContext";
import { UserContext } from "../../contexts/UserContext";

import { LeftSection, DisplaySection } from "./components";

const EditorContainer = styled.div`
  display: flex;
  max-height: calc(100vh - 40px);
  overflow: hidden;
`;

const DragLeftSection = styled.div`
  flex: 0 0 10px;
  cursor: w-resize;
  background-color: #444;
`;

export function EditorPage() {
  const [site, setSite] = useState();
  const [page, setPage] = useState();

  const { user } = useContext(UserContext);
  const { siteId } = useParams();
  const dragRef = useRef();

  useEffect(() => {
    getSite(siteId);
  }, [siteId]);

  async function getSite(siteId) {
    try {
      const response = await (await fetch(`/site/${siteId}`)).json();
      setSite(response);
      let page = response.pages.find((item) => item.pageName === "index.html");
      getPage(page.pageId);
    } catch (error) {
      console.log(error);
    }
  }
  async function getPage(pageId) {
    const response = await (await fetch(`/page/${pageId}`)).json();
    setPage(response);
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
          <LeftSection ref={dragRef} pages={site.pages} />
          <DragLeftSection onMouseDown={handleResize}></DragLeftSection>
          <DisplaySection />
        </SelectedElementProvider>
      </SiteTreeProvider>
    </EditorContainer>
  ) : null;
}
