import React from "react";
import styled from "styled-components";
import { BottomSection } from "./BottomSection";
import { TopSection } from "./TopSection";
import { ViewSection } from "./ViewSection";

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export function DisplaySection() {
  return (
    <DisplayContainer>
      <TopSection />
      <ViewSection />
      <BottomSection />
    </DisplayContainer>
  );
}
