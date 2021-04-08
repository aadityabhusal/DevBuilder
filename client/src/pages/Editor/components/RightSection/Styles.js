import React, { useEffect, useRef, useState } from "react";
import { Panel, PanelItems, PanelTitle, PanelButton } from "../Panel";
import MonacoEditor from "@monaco-editor/react";
import styled from "styled-components";

const StylePanel = styled(Panel)`
  overflow: initial;
`;

const Container = styled.div`
  display: flex;
`;

const StyleListContainet = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export function StylesPanel({ isActive }) {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
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

  const handleEditor = (editor, monaco) => {
    editorRef.current = editor;
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
      function () {
        let element = document.createElement("style");
        let sheet;
        document
          .getElementsByTagName("iframe")[0]
          .contentDocument.head.appendChild(element);
        sheet = element.sheet;
        editorRef.current
          .getValue()
          .split("}")
          .forEach((element, i) => {
            sheet.insertRule(element + "}", i);
          });
      }
    );
  };
  return (
    <StylePanel className={isActive} ref={containerRef}>
      <Container>
        <MonacoEditor
          height={height}
          width="80%"
          defaultLanguage="css"
          theme="vs-dark"
          defaultValue=""
          options={options}
          onMount={handleEditor}
        ></MonacoEditor>
        <StyleListContainet>
          <PanelTitle>Styles</PanelTitle>
        </StyleListContainet>
      </Container>
    </StylePanel>
  );
}
