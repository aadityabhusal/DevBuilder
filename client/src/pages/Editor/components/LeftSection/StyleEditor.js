import { useEffect, useState } from "react";
import styled from "styled-components";
import { updateStyle } from "../../../../utils";
import { StyleBlock } from "./StyleBlock";
import { properties } from "../../lists/properties";
import { CloseIcon } from "../Icons";

/* 
  Make the styles inside every style block as object so that the properties pasted could be over-writter
  or find another way to perform it
*/

export function StyleEditor({ currentStyle }) {
  const [styleBlocks, setStyleBlocks] = useState();

  useEffect(() => {
    setStyleBlocks((prev) => currentStyle.styles);
  }, [currentStyle]);

  const addNewStyle = () => {
    let foundInvalid = styleBlocks.findIndex((item) => item.isValid === false);
    if (foundInvalid === -1) {
      setStyleBlocks((blocks) => {
        let temp = [...blocks];
        let order = temp.length ? temp[temp.length - 1].order + 1 : 0;
        let newBlock = {
          selector: "",
          style: [],
          isValid: false,
          order,
        };
        temp.push(newBlock);
        return temp;
      });
    }
  };

  const handleStyleBlock = (e, styleBlock) => {
    let isValid = checkSelector(e.target.value, styleBlock.order);
    if (!isValid) e.target.style.border = "1px solid #e74c3c";
    styleBlock.isValid = isValid;
    styleBlock.selector = e.target.value;

    setStyleBlocks((prev) => {
      let temp = prev.map((item, i) => {
        if (item.order === styleBlock.order) {
          // this doesn't work when new styles are created immediately after creating a new style
          currentStyle.styles[i] = styleBlock;
          return styleBlock;
        }
        return item;
      });
      return temp;
    });
  };

  const deleteBlock = (order) => {
    setStyleBlocks((prev) => {
      let temp = prev.filter((item) => item.order !== order);
      currentStyle.styles = temp;
      updateStyle(currentStyle.name, temp);
      return temp;
    });
  };

  const checkSelector = (selector, order) => {
    if (selector.trim() === "") return false;
    let findSelector = styleBlocks.find(
      (item) => item.selector === selector && item.order !== order
    );
    // Style doesn't change immediately when a similar selector is found
    if (findSelector) return false;
    return true;
  };

  const addProperty = (e, styleBlock) => {
    if (e.keyCode === 13 && styleBlock.style.length === 0) {
      let newProperty = {
        name: "",
        value: "",
        isValid: false,
        order: styleBlock.style.length,
      };

      setStyleBlocks((prev) => {
        let temp = prev.map((item, i) => {
          if (item.order === styleBlock.order) {
            styleBlock.style.push(newProperty);
            return styleBlock;
          }
          return item;
        });
        return temp;
      });
    }
  };

  return styleBlocks ? (
    <StyleContainer id="style-container">
      <StyleBlockList>
        {styleBlocks.map((styleBlock) => (
          <BlockContainer key={styleBlock.order}>
            <StyleHead>
              <StyleInput
                key={styleBlock.selector}
                defaultValue={styleBlock.selector}
                onBlur={(e) => handleStyleBlock(e, styleBlock)}
                placeholder="Enter selector"
                onKeyDown={(e) => addProperty(e, styleBlock)}
              />
              <CloseButton onClick={(e) => deleteBlock(styleBlock.order)}>
                <CloseIcon />
              </CloseButton>
            </StyleHead>
            <StyleBlock data={styleBlock} currentStyle={currentStyle} />
            <PropertiesDataList id="properties-data-list">
              {properties.map((item, i) => (
                <option value={item} key={i} />
              ))}
            </PropertiesDataList>
          </BlockContainer>
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

/*  */

const BlockContainer = styled.div`
  border-bottom: 1px solid #bdc3c7;
  padding: 10px;

  &.selected-block {
    background-color: #ecf0f1;
  }
`;

const StyleHead = styled.div`
  display: flex;
  border-bottom: 1px solid #bdc3c7;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const StyleInput = styled.input`
  padding: 5px;
  border: 1px solid #bdc3c7;
  border-bottom: none;
  outline: none;
  border-radius: 0;
  width: 170px;
  margin-right: auto;
`;

const PropertiesDataList = styled.datalist``;
