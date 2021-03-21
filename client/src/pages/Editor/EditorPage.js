import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { SelectedElementProvider } from "../../contexts/SelectedElementContext";

import { LeftSection, DisplaySection, RightSection } from "./components";

const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export function EditorPage() {
  const { pageId } = useParams();
  const [site, setSite] = useState();

  useEffect(() => {
    (async (pageId) => {
      const { site } = await (await fetch(`/page/${pageId}`)).json();
      setSite(site);
    })(pageId);
  }, [pageId]);

  return site ? (
    <EditorContainer>
      <SelectedElementProvider>
        <LeftSection />
        <DisplaySection site={site} />
        <RightSection />
      </SelectedElementProvider>
    </EditorContainer>
  ) : null;
}
