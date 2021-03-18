import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { LeftSection, DisplaySection, RightSection } from "./components";

const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export function EditorPage() {
  const { pageId } = useParams();
  const [site, setSite] = useState();
  const [targetElement, setTargetElement] = useState();
  const [selectedElement, setSelectedElement] = useState();

  useEffect(() => {
    (async (pageId) => {
      const { site } = await (await fetch(`/page/${pageId}`)).json();
      setSite(site);
    })(pageId);
  }, [pageId]);

  const selectTarget = (element) => {
    if (element) {
      setTargetElement(element);
    }
  };

  const editTarget = () => {};

  const updateTarget = () => {};

  const selectElement = (element) => {
    if (element) {
      setSelectedElement(element);
    }
  };

  return site ? (
    <EditorContainer>
      <LeftSection selectElement={selectElement} />
      <DisplaySection
        site={site}
        selectTarget={selectTarget}
        updateTarget={updateTarget}
        selectedElement={selectedElement}
      />
      <RightSection target={targetElement} editTarget={editTarget} />
    </EditorContainer>
  ) : null;
}
