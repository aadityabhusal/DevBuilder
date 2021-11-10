import React, { useContext, useEffect, useRef, useState } from "react";
import { PanelInputText } from "../../../../components/editor/Panel";
import { StylePanel } from "../../../../components/editor/LeftSection";
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
} from "../../../../components/common/DropDownMenu";
import { CloseIcon, DropDownIcon } from "../../../../components/ui/Icons";
import { StyleEditor } from "./StyleEditor";

export function StylesPanel({ isActive }) {
  const dropDownListRef = useRef();
  const inputBoxRef = useRef();

  const { pageTree, updateStyles } = useContext(PageTreeContext);
  const [currentStyle, setCurrentStyle] = useState();
  const [styleList, setStyleList] = useState();
  let stylesLength = Object.keys(pageTree.head.style).length;

  console.log("REDE");

  useEffect(() => {
    let styles = Object.values(pageTree.head.style);
    setStyleList(styles);
    setCurrentStyle(styles[0]);
  }, [stylesLength]);

  const addStyle = (e) => {
    if (e.keyCode === 13) {
      let name = e.target.value;
      e.target.value = "";
      updateStyles(name);
    }
  };

  const deleteStyle = (e, name) => {
    e.stopPropagation();
    updateStyles(name, "delete");
    setStyleList((prev) => {
      let arr = prev.filter((item) => item.name !== name);
      return arr;
    });
    setCurrentStyle(styleList[0] || []);
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
    itemRef.current.children[0].focus();
  };

  return (
    <StylePanel onClick={removeDropDowns} className={isActive}>
      <DropDownMenu>
        <DropDownButton onClick={(e) => handleDropdown(e, dropDownListRef)}>
          <ItemName>{currentStyle && currentStyle.name}.css</ItemName>
          <DropDownIcon></DropDownIcon>
        </DropDownButton>
        <AddNewButton onClick={(e) => handleDropdown(e, inputBoxRef)}>
          Add Style
        </AddNewButton>
        <DropDownList ref={dropDownListRef}>
          {styleList &&
            styleList.map((item) => (
              <DropDownListItem
                key={item.name}
                onClick={(e) => setCurrentStyle(item)}
              >
                <ItemName>{item.name}.css</ItemName>
                <CloseButton onClick={(e) => deleteStyle(e, item.name)}>
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
      {currentStyle ? <StyleEditor currentStyle={currentStyle} /> : null}
    </StylePanel>
  );
}
