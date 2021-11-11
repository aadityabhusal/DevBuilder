import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { PageTreeProvider } from "../../contexts/PageTreeContext";

import { LeftSection, DisplaySection } from "./components";
import { SiteTreeProvider } from "../../contexts/SiteTreeContext";
import { CommandProvider } from "../../contexts/CommandContext";
import {
  DragLeftSection,
  EditorContainer,
} from "../../components/editor/Editor";
import { UserContext } from "../../contexts/UserContext";

export function EditorPage({ history, user }) {
  const [site, setSite] = useState();
  const [page, setPage] = useState();
  const { authFetch } = useContext(UserContext);

  const { siteId } = useParams();
  const dragRef = useRef();

  useEffect(() => {
    async function getSite(siteId, history, user) {
      try {
        let siteResponse = await authFetch(`/api/site/${siteId}`, "GET");
        if (siteResponse.userId !== user._id) {
          history.push("/");
        } else {
          setSite(siteResponse);
          let page = siteResponse.pages.find(
            (item) => item.pageName === "index.html"
          );
          let pageResponse = await authFetch(`/api/page/${page.pageId}`, "GET");
          setPage(pageResponse);
        }
      } catch (error) {}
    }

    getSite(siteId, history, user);
  }, [siteId, history, user, authFetch]);

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
      document.getElementById("style-container").style.width = `${e.pageX}px`;
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
            <CommandProvider>
              <LeftSection ref={dragRef} />
              <DragLeftSection onMouseDown={handleResize}></DragLeftSection>
              <DisplaySection />
            </CommandProvider>
          </PageTreeProvider>
        ) : null}
      </SiteTreeProvider>
    </EditorContainer>
  ) : null;
}
