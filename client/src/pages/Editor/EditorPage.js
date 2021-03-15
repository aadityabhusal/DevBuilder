import React, { useState } from "react";
import styled from "styled-components";

import { LeftSection, DisplaySection, RightSection } from "./components";

const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export function EditorPage() {
  const [targetElement, setTargetElement] = useState();

  const selectTarget = (element) => {
    if (element) {
      setTargetElement(element);
    }
  };

  const editTarget = () => {};

  const updateTarget = () => {};

  return (
    <EditorContainer>
      <LeftSection />
      <DisplaySection selectTarget={selectTarget} updateTarget={updateTarget} />
      <RightSection target={targetElement} editTarget={editTarget} />
    </EditorContainer>
  );
}
