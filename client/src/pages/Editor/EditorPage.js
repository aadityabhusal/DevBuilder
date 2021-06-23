import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { SelectedElementProvider } from "../../contexts/SelectedElementContext";
import { PageTreeProvider } from "../../contexts/PageTreeContext";
import { UserContext } from "../../contexts/UserContext";

import { LeftSection, DisplaySection } from "./components";
import { SiteTreeProvider } from "../../contexts/SiteTreeContext";
import { CommandProvider } from "../../contexts/CommandContext";

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

export function EditorPage({ history }) {
  const [site, setSite] = useState();
  const [page, setPage] = useState();

  const { user } = useContext(UserContext);
  const { siteId } = useParams();
  const dragRef = useRef();

  useEffect(() => {
    getSite(siteId, history, user);
  }, [siteId, history, user]);

  async function getSite(siteId, history, user) {
    try {
      const siteResponse = await (await fetch(`/site/${siteId}`)).json();
      if (siteResponse.userId !== user._id) {
        history.push("/");
      } else {
        setSite(siteResponse);
        let page = siteResponse.pages.find(
          (item) => item.pageName === "index.html"
        );
        const pageResponse = await (await fetch(`/page/${page.pageId}`)).json();
        setPage(pageResponse);
      }
    } catch (error) {
      // console.log(error);
    }
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

  return site ? (
    <EditorContainer>
      <SiteTreeProvider value={site}>
        {page ? (
          <PageTreeProvider value={page}>
            <SelectedElementProvider>
              <CommandProvider>
                <LeftSection ref={dragRef} />
                <DragLeftSection onMouseDown={handleResize}></DragLeftSection>
                <DisplaySection />
              </CommandProvider>
            </SelectedElementProvider>
          </PageTreeProvider>
        ) : null}
      </SiteTreeProvider>
    </EditorContainer>
  ) : null;
}
