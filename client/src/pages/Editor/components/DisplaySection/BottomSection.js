import React, { useContext } from "react";
import { SiteTreeContext } from "../../../../contexts/SiteTreeContext";
import { PanelButton } from "../Panel";

import { BottomContainer } from "./TopBottomSection";

export function BottomSection() {
  let [, , saveSite] = useContext(SiteTreeContext);
  return (
    <BottomContainer>
      <PanelButton style={{ padding: "10px" }} onClick={(e) => saveSite()}>
        Save Page
      </PanelButton>
    </BottomContainer>
  );
}
