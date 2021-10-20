import React from "react";
import styled from "styled-components";
import { SectionMask } from "../Panel";
import { ViewSection } from "./ViewSection";

const DisplayContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

export function DisplaySection() {
  return (
    <DisplayContainer>
      <SectionMask id="display-mask"></SectionMask>
      <ViewSection />
    </DisplayContainer>
  );
}
