import React, { useEffect, useRef, useState } from "react";
import { Panel, PanelItems, PanelTitle, PanelButton } from "../Panel";
import MonacoEditor from "@monaco-editor/react";
import styled from "styled-components";

const RightPanel = styled(Panel)`
  overflow: initial;
  flex-direction: column;
  & section {
    flex: 1;
    height: 300px;
  }
`;

export function StylesPanel({ isActive }) {
  const containerRef = useRef(null);
  const [height, setHeight] = useState();

  useEffect(() => {
    setHeight(containerRef.current?.parentNode.clientHeight - 10);
  }, []);

  const options = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: false,
    },
  };

  const handleChange = (e) => {};
  return (
    <RightPanel className={isActive} ref={containerRef}>
      {/* <PanelTitle>Styles</PanelTitle> */}
      {/* <PanelItems> */}
      <MonacoEditor
        height={height}
        defaultLanguage="css"
        theme="vs-dark"
        defaultValue=""
        options={options}
      ></MonacoEditor>
      {/* </PanelItems> */}
    </RightPanel>
  );
}
