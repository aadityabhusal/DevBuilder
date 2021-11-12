import React, { useContext } from "react";
import {
  DisplayContainer,
  TopBar,
} from "../../../../components/editor/DisplaySection";
import { SectionMask } from "../../../../components/editor/Panel";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
import { ViewSection } from "./ViewSection";
import { PanelButton } from "../../../../components/editor/Panel";
import { CommandContext } from "../../../../contexts/CommandContext";
import { NavLink } from "react-router-dom";
export function DisplaySection() {
  const { pageTree, savePage } = useContext(PageTreeContext);
  const { undo, redo } = useContext(CommandContext);

  return pageTree ? (
    <DisplayContainer>
      <SectionMask id="display-mask"></SectionMask>
      <TopBar>
        <NavLink activeClassName="is-active" to="/" exact={true}>
          Go to Home
        </NavLink>
        <PanelButton id="saveProps" onClick={undo} title="Undo Action">
          Undo
        </PanelButton>
        <PanelButton id="saveProps" onClick={redo} title="Redo Action">
          Redo
        </PanelButton>
        <PanelButton id="saveProps" onClick={savePage} title="Save Page">
          Save Page
        </PanelButton>
      </TopBar>
      <ViewSection />
    </DisplayContainer>
  ) : null;
}
