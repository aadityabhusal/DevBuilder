import React from "react";
import { Panel, PanelTitle } from "../Panel";

export function LayoutsPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Layouts</PanelTitle>
      <div data-layout="layout1">Layout 1</div>
      <div data-layout="layout2">Layout 2</div>
      <div data-layout="layout3">Layout 3</div>
    </Panel>
  );
}
