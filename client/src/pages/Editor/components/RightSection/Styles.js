import React from "react";
import { Panel, PanelTitle } from "../Panel";

export function StylesPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Styles</PanelTitle>
      <code id="cssEditor" className="language-css"></code>
      <button id="saveStyle">Save</button>
    </Panel>
  );
}
