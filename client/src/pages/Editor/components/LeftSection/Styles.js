import React, { useContext, useEffect, useRef, useState } from "react";
import { Panel, PanelInputText } from "../Panel";
import MonacoEditor from "@monaco-editor/react";
import styled from "styled-components";
import { SiteTreeContext } from "../../../../contexts/SiteTreeContext";
import {
  DropDownButton,
  AddNewButton,
  DropDownList,
  DropDownMenu,
  DropDownListItem,
  ItemName,
  AddItemBox,
  CloseButton,
} from "../DropDownMenu";
import { CloseIcon, DropDownIcon } from "../Icons";

const StylePanel = styled(Panel)`
  overflow: initial;
  padding: 0;
`;

export function StylesPanel({ isActive }) {
  const editorRef = useRef(null);
  const dropDownListRef = useRef();
  const inputBoxRef = useRef();

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
    setCurrentStyle(styleList[0] || []);
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

  const removeDropDowns = () => {
    dropDownListRef.current.style.display = "none";
    inputBoxRef.current.style.display = "none";
  };

  const handleDropdown = (e, itemRef) => {
    e.stopPropagation();
    removeDropDowns();
    let display = itemRef.current.style.display;
    itemRef.current.style.display = display === "flex" ? "none" : "flex";
  };

  return (
    <StylePanel onClick={removeDropDowns} className={isActive}>
      <DropDownMenu>
        <DropDownButton onClick={(e) => handleDropdown(e, dropDownListRef)}>
          <ItemName>{currentStyle[0]}.css</ItemName>
          <DropDownIcon></DropDownIcon>
        </DropDownButton>
        <AddNewButton onClick={(e) => handleDropdown(e, inputBoxRef)}>
          Add Style
        </AddNewButton>
        <DropDownList ref={dropDownListRef}>
          {styleList.map((item) => (
            <DropDownListItem
              key={item[0]}
              onClick={(e) => setCurrentStyle(item)}
            >
              <ItemName>{item[0]}.css</ItemName>
              <CloseButton onClick={(e) => deleteStyle(e, item[0])}>
                <CloseIcon></CloseIcon>
              </CloseButton>
            </DropDownListItem>
          ))}
        </DropDownList>
        <AddItemBox ref={inputBoxRef}>
          <PanelInputText
            placeholder="Enter a style name and press enter"
            onClick={(e) => e.stopPropagation()}
            onKeyUp={addStyle}
          ></PanelInputText>
        </AddItemBox>
      </DropDownMenu>
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
