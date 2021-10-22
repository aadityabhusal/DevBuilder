import React, { useContext, useEffect, useRef, useState } from "react";
import { Panel, PanelInputText } from "../Panel";
import styled from "styled-components";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
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
import { StyleEditor } from "./StyleEditor";

const StylePanel = styled(Panel)`
  overflow: initial;
  padding: 0;
  height: calc(100vh - 85px);
`;

export function StylesPanel({ isActive }) {
  const dropDownListRef = useRef();
  const inputBoxRef = useRef();

  /* SavePage function to save the style */
  const { pageTree, updateStyles, savePage } = useContext(PageTreeContext);
  const [currentStyle, setCurrentStyle] = useState([]);
  const [styleList, setStyleList] = useState([]);

  useEffect(() => {
    let styles = Object.entries(pageTree.head.style);
    setStyleList(styles);
    setCurrentStyle([styles[0][0], pageTree.head.style[styles[0][0]]]);
  }, [pageTree.head.style]);

  const addStyle = (e) => {
    if (e.keyCode === 13) {
      let value = e.target.value;
      updateStyles(value);
      setStyleList((prev) => [...prev, [value, []]]);
      e.target.value = "";
    }
    let stylesheet = document.createElement("style");
    stylesheet.id = e.target.value + "-stylesheet";
    document
      .getElementById("iframe-view")
      .contentDocument.head.appendChild(stylesheet);
  };

  const deleteStyle = (e, name) => {
    e.stopPropagation();
    updateStyles(name, "delete");
    setStyleList((prev) => {
      let arr = prev.filter((item) => item[0] !== name);
      return arr;
    });
    setCurrentStyle(styleList[0] || []);
  };

  /* Handles editor's onChange events */
  const handleEditor = (value) => {
    setStyleList((prev) => {
      return prev.map((item) => {
        if (item[0] === currentStyle[0]) {
          item[1] = value;
        }
        return item;
      });
    });
    let stylesheet = document
      .getElementById("iframe-view")
      .contentDocument.getElementById(currentStyle[0] + "-stylesheet");

    /* stylelist value from editor */
    stylesheet.innerHTML = value;
    updateStyles(currentStyle[0], "update", value);
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
      {/* 0 = css file name & 1 = css text */}
      {currentStyle[0] ? (
        <StyleEditor
          currentStyle={
            pageTree.head.style[Object.keys(pageTree.head.style)[0]]
          }
          handleEditor={handleEditor}
        />
      ) : null}
    </StylePanel>
  );
}
