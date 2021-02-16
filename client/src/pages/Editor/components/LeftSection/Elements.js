import React from "react";
import { Panel, PanelItems, PanelTitle, PanelItem } from "../Panel";

export function ElementsPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Elements</PanelTitle>
      <PanelItems cols={2}>
        <PanelItem data-element="PanelItem">Div</PanelItem>
        <PanelItem data-element="a">Link</PanelItem>
        <PanelItem data-element="button">Button</PanelItem>
      </PanelItems>
    </Panel>
  );
}
