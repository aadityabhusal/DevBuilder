import { useEffect, useState } from "react";
import styled from "styled-components";
import { updateStyle } from "../../../../utils";
import { StyleBlock } from "./StyleBlock";
import { properties } from "../../lists/properties";
import { CloseIcon } from "../Icons";

/* 
  ERROR: When a selector value is left empty and then added and enter key is pressed, two properties are created at once
  Possible Reason: Double Events Attached
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
        let newBlock = {
          selector: "",
          style: [],
          isValid: false,
        };
        temp.push(newBlock);
        return temp;
      });
    }
  };

  const handleStyleBlock = (e, styleBlock, index) => {
    let isValid = checkSelector(e.target.value, index);
    if (!isValid) e.target.style.border = "1px solid #e74c3c";
    styleBlock.isValid = isValid;
    styleBlock.selector = e.target.value;

    setStyleBlocks((prev) => {
      let temp = prev.map((item, i) => {
        if (item.selector === styleBlock.selector) {
          // this doesn't work when new styles are created immediately after creating a new style
          currentStyle.styles[i] = styleBlock;
          return styleBlock;
        }
        return item;
      });
      return temp;
    });
  };

  const checkSelector = (selector, index) => {
    if (selector.trim() === "") return false;
    let findSelector = styleBlocks.find(
      (item, i) => item.selector === selector && i !== index
    );
    // Style doesn't change immediately when a similar selector is found
    if (findSelector) return false;
    return true;
  };

  const deleteBlock = (selector) => {
    setStyleBlocks((prev) => {
      let temp = prev.filter((item) => item.selector !== selector);
      currentStyle.styles = temp;
      updateStyle(currentStyle.name, temp);
      return temp;
    });
  };

  const addProperty = (e, styleBlock) => {
    if (e.keyCode === 13 && styleBlock.style.length === 0) {
      let newProperty = {
        name: "",
        value: "",
        isValid: false,
      };

      setStyleBlocks((prev) => {
        let temp = prev.map((item, i) => {
          if (item.selector === styleBlock.selector) {
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
        {styleBlocks.map((styleBlock, i) => (
          <BlockContainer key={styleBlock.selector}>
            <StyleHead>
              <StyleInput
                key={styleBlock.selector}
                defaultValue={styleBlock.selector}
                onBlur={(e) => handleStyleBlock(e, styleBlock, i)}
                placeholder="Enter selector"
                onKeyDown={(e) => addProperty(e, styleBlock)}
              />
              <CloseButton
                onClick={(e) => deleteBlock(styleBlock.selector)}
                title="Delete Style Block"
              >
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
