import React from "react";
import { Panel, PanelTitle } from "../Panel";
import { pageTree } from "../../../../contexts/PageTreeContext";

export function NavigatorPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Navigator</PanelTitle>
    </Panel>
  );
}
