import React from "react";
import { Panel, PanelItems, PanelTitle, PanelButton } from "../Panel";
import MonacoEditor from "@monaco-editor/react";
export function StylesPanel({ isActive }) {
  const options = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: false,
    },
  };

  const handleChange = (e) => {};
  return (
    <Panel className={isActive}>
      <PanelTitle>Styles</PanelTitle>
      <PanelItems>
        <MonacoEditor
          height="450px"
          defaultLanguage="css"
          theme="vs-dark"
          defaultValue=""
          options={options}
        ></MonacoEditor>
        <PanelButton id="saveStyle">Save</PanelButton>
      </PanelItems>
    </Panel>
  );
}
