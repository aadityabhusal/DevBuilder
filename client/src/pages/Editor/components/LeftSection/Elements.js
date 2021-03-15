import React from "react";
import { Panel, PanelItems, PanelTitle, PanelItem } from "../Panel";

export function ElementsPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Elements</PanelTitle>
      <PanelItems cols={2}>
        <PanelItem data-element="div">Block</PanelItem>
        <PanelItem data-element="a">Link</PanelItem>
        <PanelItem data-element="button">Button</PanelItem>
        <PanelItem data-element="p">Text</PanelItem>
        <PanelItem data-element="ol">Ordered List</PanelItem>
        <PanelItem data-element="ul">Unordered List</PanelItem>
      </PanelItems>
    </Panel>
  );
}
