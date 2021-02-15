import React from "react";
import { Panel, PanelTitle } from "../Panel";

export function PropertiesPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Properties</PanelTitle>
      <input
        type="text"
        id="elementId"
        data-elem-prop="id"
        placeholder="Enter the id"
      />
      <input
        type="text"
        id="elementClass"
        data-elem-prop="class"
        placeholder="Enter the classes"
      />
      <textarea id="text" placeholder="Enter the text content"></textarea>
      <button id="saveProps">Save</button>
    </Panel>
  );
}
