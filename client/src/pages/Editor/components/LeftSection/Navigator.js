import React from "react";
import { Panel, PanelTitle } from "../Panel";

export function NavigatorPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Navigator</PanelTitle>
    </Panel>
  );
}
