import { useEffect, useState } from "react";
import styled from "styled-components";
import { StyleBlock } from "./StyleBlock";

export function StyleEditor({ currentStyle }) {
  const [styleBlocks, setStyleBlocks] = useState();

  /* Changes to the display section will be applied here

  Handles editor's onChange events
  const handleEditor = (value) => {
    setStyleList((prev) => {
      return prev.map((item) => {
        if (item.name === currentStyle.name) {
          item = value; // value not defined properly
        }
        return item;
      });
    });
    let stylesheet = document
      .getElementById("iframe-view")
      .contentDocument.getElementById(currentStyle.name + "-stylesheet");

    // stylelist value from editor
    stylesheet.innerHTML = value;
    // updateStyles(currentStyle[0], "update", value);
  };

  */

  useEffect(() => {
    setStyleBlocks((prev) => currentStyle.styles);
  }, [currentStyle]);

  const addNewStyle = () => {
    let foundInvalid = styleBlocks.findIndex((item) => item.isValid === false);
    if (foundInvalid === -1) {
      setStyleBlocks((blocks) => {
        let temp = [...blocks];
        let newBlock = {
          selector: "",
          style: [],
          isValid: false,
          order: temp.length,
        };
        temp.push(newBlock);
        return temp;
      });
    }
  };

  const handleStyleBlock = (styleBlock) => {
    setStyleBlocks((prev) => {
      let temp = [...prev];
      delete styleBlock.prev;
      if (styleBlock.isValid) {
        currentStyle.styles[styleBlock.order] = styleBlock;
      }
      temp[styleBlock.order] = styleBlock;
      return temp;
    });
  };

  return styleBlocks ? (
    <StyleContainer id="style-container">
      <StyleBlockList>
        {styleBlocks.map((styleBlock) => (
          <StyleBlock
            data={styleBlock}
            key={styleBlock.order}
            handleStyleBlock={handleStyleBlock}
            selectorList={styleBlocks.map((item) => item.selector)}
          />
        ))}
      </StyleBlockList>
      <AddNewStyle onClick={addNewStyle}>Add New Style</AddNewStyle>
    </StyleContainer>
  ) : null;
}

const StyleContainer = styled.div`
  flex: 1;
  height: calc(100% - 200px);
  padding-top: 15px;
  display: flex;
  flex-direction: column;
`;

const StyleBlockList = styled.div`
  flex: 1;
  overflow-y: auto;
  border-bottom: 1px solid #bdc3c7;
`;

const AddNewStyle = styled.button`
  padding: 10px 15px;
  margin: 10px;
  border: 1px solid #bdc3c7;
  cursor: pointer;
  align-self: flex-end;
  font-weight: bold;
  background-color: #34495e;
  color: #eee;
`;