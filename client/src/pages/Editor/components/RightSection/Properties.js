import React from "react";
import {
  Panel,
  PanelButton,
  PanelTitle,
  PanelInputText,
  PanelTextArea,
} from "../Panel";

export function PropertiesPanel({ isActive }) {
  return (
    <Panel className={isActive}>
      <PanelTitle>Properties</PanelTitle>
      <PanelInputText
        type="text"
        id="elementId"
        data-elem-prop="id"
        placeholder="Enter the id"
      />
      <PanelInputText
        type="text"
        id="elementClass"
        data-elem-prop="class"
        placeholder="Enter the classes"
      />
      <PanelTextArea
        id="text"
        placeholder="Enter the text content"
      ></PanelTextArea>
      <PanelButton id="saveProps">Save</PanelButton>
    </Panel>
  );
}
