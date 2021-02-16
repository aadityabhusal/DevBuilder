import React from "react";
import { Panel, PanelItem, PanelItems, PanelTitle } from "../Panel";

export function PagesPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Pages</PanelTitle>
      <PanelItems cols={1}>
        <PanelItem data-page="page1">Page 1</PanelItem>
        <PanelItem data-page="page1">Page 2</PanelItem>
        <PanelItem data-page="page1">Page 3</PanelItem>
      </PanelItems>
    </Panel>
  );
}
