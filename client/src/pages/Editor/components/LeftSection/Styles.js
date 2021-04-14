import React, { useContext, useEffect, useRef, useState } from "react";
import { Panel, PanelItems, PanelTitle, PanelInputText } from "../Panel";
import MonacoEditor from "@monaco-editor/react";
import styled from "styled-components";
import { SiteTreeContext } from "../../../../contexts/SiteTreeContext";

const StylePanel = styled(Panel)`
  overflow: initial;
  padding: 0;
`;

const StyleList = styled.div`
  max-height: 200px;
  overflow: auto;
`;

const StyleItem = styled.div`
  padding: 10px;
  border: 1px solid #eee;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const DeleteStyle = styled.div``;

const Container = styled.div`
  display: flex;
`;

const StyleListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 5px;
  & input {
    justify-self: flex-end;
    max-height: 20px;
    margin-top: 10px;
  }
`;

export function StylesPanel({ isActive }) {
  const editorRef = useRef(null);

  const { siteTree, updateStyles, saveSite } = useContext(SiteTreeContext);
  const [currentStyle, setCurrentStyle] = useState([]);
  const [styleList, setStyleList] = useState([]);

  useEffect(() => {
    let styles = Object.entries(siteTree.head.styles);
    setStyleList(styles);
    setCurrentStyle([styles[0][0], siteTree.head.styles[styles[0][0]]]);
  }, [siteTree.head.styles]);

  const options = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: false,
    },
  };

  const addStyle = (e) => {
    if (e.keyCode === 13) {
      let value = e.target.value;
      updateStyles(value);
      setStyleList((prev) => [...prev, [value, ""]]);
      saveSite();
      e.target.value = "";
    }
  };

  const deleteStyle = (e, name) => {
    e.stopPropagation();
    updateStyles(name, "delete");
    setStyleList((prev) => {
      let arr = prev.filter((item) => item[0] !== name);
      return arr;
    });
    saveSite();
  };

  const handleEditor = (value) => {
    setCurrentStyle([currentStyle[0], value]);
    // This needs to get optimzed because it is updating the constext tree on value change
    updateStyles(currentStyle[0], "update", value);
    let element = document.createElement("style");
    let sheet;
    document
      .getElementsByTagName("iframe")[0]
      .contentDocument.head.appendChild(element);
    sheet = element.sheet;
    sheet.insertRule(editorRef.current.getValue(), 0);
    editorRef.current
      .getValue()
      .split("}")
      .forEach((element, i) => {
        sheet.insertRule(element + "}", i);
      });
  };

  const mountEditor = (editor, monaco) => {
    editorRef.current = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, saveSite);
  };

  return (
    <StylePanel className={isActive}>
      {currentStyle[0] ? (
        <MonacoEditor
          height="95vh"
          defaultLanguage="css"
          theme="vs-dark"
          saveViewState={true}
          value={currentStyle[1]}
          options={options}
          onMount={mountEditor}
          onChange={handleEditor}
        ></MonacoEditor>
      ) : null}
    </StylePanel>
  );
}
