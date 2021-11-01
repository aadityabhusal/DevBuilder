import React from "react";
import { DisplayContainer } from "../../../../components/editor/DisplaySection";
import { SectionMask } from "../../../../components/editor/Panel";
import { ViewSection } from "./ViewSection";

export function DisplaySection() {
  return (
    <DisplayContainer>
      <SectionMask id="display-mask"></SectionMask>
      <ViewSection />
    </DisplayContainer>
  );
}
