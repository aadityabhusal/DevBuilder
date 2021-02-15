import React from "react";
import styled from "styled-components";

import { LeftSection, DisplaySection, RightSection } from "./components";

const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export function EditorPage() {
  return (
    <EditorContainer>
      <LeftSection />
      <DisplaySection />
      <RightSection />
    </EditorContainer>
  );
}
