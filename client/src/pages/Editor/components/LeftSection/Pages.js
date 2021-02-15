import React from "react";
import { Panel, PanelTitle } from "../Panel";

export function PagesPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Pages</PanelTitle>
      <div data-page="page1">Page 1</div>
      <div data-page="page1">Page 1</div>
    </Panel>
  );
}
