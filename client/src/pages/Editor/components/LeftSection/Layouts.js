import React from "react";
import { Panel, PanelItem, PanelItems, PanelTitle } from "../Panel";

export function LayoutsPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Layouts</PanelTitle>
      <PanelItems cols={2}>
        <PanelItem data-layout="layout1">Layout 1</PanelItem>
        <PanelItem data-layout="layout1">Layout 2</PanelItem>
        <PanelItem data-layout="layout1">Layout 3</PanelItem>
      </PanelItems>
    </Panel>
  );
}
