import React, { useContext, useEffect, useRef, useState } from "react";
import { Panel, PanelItems, PanelTitle, PanelInputText } from "../Panel";
import MonacoEditor from "@monaco-editor/react";
import styled from "styled-components";
import { SiteTreeContext } from "../../../../contexts/SiteTreeContext";

const StylePanel = styled(Panel)`
  overflow: initial;
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
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const [height, setHeight] = useState();
  const { siteTree, updateStyles, saveSite } = useContext(SiteTreeContext);
  const [currentStyle, setCurrentStyle] = useState([]);
  const [styleList, setStyleList] = useState([]);

  useEffect(() => {
    setHeight(containerRef.current?.parentNode.clientHeight - 10);
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
    e = window.event;
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
  };

  const mountEditor = (editor, monaco) => {
    editorRef.current = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, saveSite);
  };

  return (
    <StylePanel className={isActive} ref={containerRef}>
      <Container>
        {currentStyle[0] ? (
          <MonacoEditor
            height={height}
            width="80%"
            defaultLanguage="css"
            theme="vs-dark"
            saveViewState={true}
            value={currentStyle[1]}
            options={options}
            onMount={mountEditor}
            onChange={handleEditor}
          ></MonacoEditor>
        ) : null}
        <StyleListContainer>
          <PanelTitle>Styles</PanelTitle>
          <StyleList>
            {styleList.map((item) => (
              <StyleItem key={item[0]} onClick={(e) => setCurrentStyle(item)}>
                {item[0]}
                <DeleteStyle onClick={(e) => deleteStyle(e, item[0])}>
                  x
                </DeleteStyle>
              </StyleItem>
            ))}
          </StyleList>
          <PanelInputText
            placeholder="Type name and hit enter"
            onKeyUp={addStyle}
          />
        </StyleListContainer>
      </Container>
    </StylePanel>
  );
}
