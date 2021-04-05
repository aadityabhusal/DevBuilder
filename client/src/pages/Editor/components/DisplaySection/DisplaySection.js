import React from "react";
import styled from "styled-components";
import { BottomSection } from "./BottomSection";
import { TopSection } from "./TopSection";
import { ViewSection } from "./ViewSection";

const DisplayContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  flex: 1; */
  display: flex;
  flex: 1;
  /* width: 100%; */
`;

export function DisplaySection({ site }) {
  return (
    <DisplayContainer>
      {/* <TopSection /> */}
      <ViewSection site={site} />
      {/* <BottomSection /> */}
    </DisplayContainer>
  );
}
