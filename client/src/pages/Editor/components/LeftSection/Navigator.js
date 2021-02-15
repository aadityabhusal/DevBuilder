import React from "react";
import { Panel, PanelTitle } from "../Panel";

export function NavigatorPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Navigator</PanelTitle>
      <div data-navigator="navigator1">Navigator 1</div>
      <div data-navigator="navigator1">Navigator 1</div>
    </Panel>
  );
}
