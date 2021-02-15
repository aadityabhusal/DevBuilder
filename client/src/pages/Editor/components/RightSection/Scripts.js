import React from "react";
import { Panel, PanelTitle } from "../Panel";

export function ScriptsPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Scripts</PanelTitle>
    </Panel>
  );
}
