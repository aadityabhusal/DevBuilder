import React from "react";
import { Panel, PanelTitle } from "../Panel";

export function ElementsPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Elements</PanelTitle>
      <div data-element="div">Div</div>
      <div data-element="a">Link</div>
      <div data-element="button">Button</div>
    </Panel>
  );
}
