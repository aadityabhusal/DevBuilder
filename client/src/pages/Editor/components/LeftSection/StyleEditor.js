import { useEffect, useState } from "react";
import { updateStyle } from "../../../../utils";
import { StyleBlock } from "./StyleBlock";
import { properties } from "../../lists/properties";
import { CloseIcon } from "../../../../components/ui/Icons";
import { nanoid } from "nanoid";
import {
  AddNewStyle,
  BlockContainer,
  CloseButton,
  PropertiesDataList,
  StyleBlockList,
  StyleContainer,
  StyleHead,
  StyleInput,
} from "../../../../components/editor/StyleEditor";

/* 
  - StyleBlocks that are added in a newly created style are not saved in pageTree context 
*/

export function StyleEditor({ currentStyle }) {
  const [styleBlocks, setStyleBlocks] = useState();

  useEffect(() => {
    setStyleBlocks((prev) => currentStyle);
  }, [currentStyle]);

  const addNewStyle = () => {
    let foundInvalid = styleBlocks.styles.findIndex(
      (item) => item.isValid === false
    );
    if (foundInvalid === -1) {
      let update = { ...styleBlocks };
      let _id = nanoid();
      update.styles.push({
        _id,
        selector: "",
        style: [],
        isValid: false,
      });
      setStyleBlocks((blocks) => update);
    }
  };

  const handleStyleBlock = (e, styleBlock) => {
    let isValid = checkSelector(e.target.value, styleBlock._id);
    if (!isValid) e.target.style.border = "1px solid #e74c3c";
    else {
      e.target.style.borderColor = "#bdc3c7";
      e.target.style.borderBottom = "none";
    }

    let update = { ...styleBlocks };
    update.styles.forEach((item, i) => {
      if (item._id === styleBlock._id) {
        item.selector = e.target.value;
        item.isValid = Boolean(isValid);
      }
    });

    setStyleBlocks((prev) => update);
  };

  const checkSelector = (selector, _id) => {
    if (selector.trim() === "") return false;
    let findSelector = styleBlocks.styles.find(
      (item) => item.selector === selector && item._id !== _id
    );
    if (findSelector) return 0;
    return true;
  };

  const deleteBlock = (_id) => {
    let update = { ...styleBlocks };
    let index = update.styles.findIndex((item) => item._id === _id);
    update.styles.splice(index, 1);
    updateStyle(currentStyle.name, update.styles);

    setStyleBlocks((prev) => update);
  };

  const addProperty = (e, styleBlock) => {
    if (e.keyCode === 13 && styleBlock.style.length === 0) {
      let update = { ...styleBlocks };
      update.styles.forEach((item, i) => {
        if (item._id === styleBlock._id) {
          item.style.push({
            name: "",
            value: "",
            isValid: false,
          });
        }
      });
      setStyleBlocks((prev) => update);
    }
  };

  return styleBlocks ? (
    <StyleContainer id="style-container">
      <StyleBlockList>
        {styleBlocks.styles.map((styleBlock, i) => (
          <BlockContainer key={styleBlock._id}>
            <StyleHead>
              <StyleInput
                defaultValue={styleBlock.selector}
                onBlur={(e) => handleStyleBlock(e, styleBlock)}
                placeholder="Enter selector"
                onKeyDown={(e) => addProperty(e, styleBlock)}
                autoFocus={i + 1 === styleBlocks.styles.length ? true : false}
              />
              <CloseButton
                onClick={(e) => deleteBlock(styleBlock._id)}
                title="Delete Style Block"
              >
                <CloseIcon />
              </CloseButton>
            </StyleHead>
            <StyleBlock
              data={styleBlock}
              blockKey={i}
              currentStyle={currentStyle.name}
            />
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
