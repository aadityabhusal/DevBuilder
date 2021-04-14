import React from "react";
import { Panel, PanelTitle } from "../Panel";

export function SettingsPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Settings</PanelTitle>
    </Panel>
  );
}
