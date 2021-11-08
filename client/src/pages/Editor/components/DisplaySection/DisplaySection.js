import React, { useContext } from "react";
import { DisplayContainer } from "../../../../components/editor/DisplaySection";
import { SectionMask } from "../../../../components/editor/Panel";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
import { ViewSection } from "./ViewSection";

export function DisplaySection() {
  const { pageTree } = useContext(PageTreeContext);
  return pageTree ? (
    <DisplayContainer>
      <SectionMask id="display-mask"></SectionMask>
      <ViewSection />
    </DisplayContainer>
  ) : null;
}
