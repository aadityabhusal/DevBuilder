import React from "react";
import { Panel, PanelItems, PanelTitle, PanelButton } from "../Panel";

export function StylesPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Styles</PanelTitle>
      <PanelItems>
        <code id="cssEditor" className="language-css"></code>
        <PanelButton id="saveStyle">Save</PanelButton>
      </PanelItems>
    </Panel>
  );
}
