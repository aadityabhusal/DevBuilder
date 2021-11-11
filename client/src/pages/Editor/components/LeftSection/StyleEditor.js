import { useContext, useEffect, useState } from "react";
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
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
import { CommandContext } from "../../../../contexts/CommandContext";

/* 
  - StyleBlocks that are added in a newly created style are not saved in pageTree context 
*/

export function StyleEditor({ currentStyle }) {
  const [styleBlocks, setStyleBlocks] = useState();
  const { addCommand } = useContext(CommandContext);
  const { pageTree, moveStyleBlock, styleBlockChange } =
    useContext(PageTreeContext);
  let styles = pageTree.head.style[currentStyle.name].styles;

  useEffect(() => {
    setStyleBlocks((prev) => styles);
  }, [styles.length]);

  const addNewStyle = () => {
    let foundInvalid = styleBlocks.findIndex((item) => item.isValid === false);
    if (foundInvalid === -1) {
      let _id = nanoid();
      let index = styleBlocks.length;
      let styleBlock = {
        _id,
        selector: "",
        style: [],
        isValid: false,
      };
      addCommand({
        action: "moveStyleBlock",
        styleName: currentStyle.name,
        styleBlock: styleBlock,
        from: null,
        to: index,
      });
      moveStyleBlock(currentStyle.name, styleBlock, null, index);
    }
  };

  const handleStyleBlock = (e, styleBlock) => {
    let isValid = checkSelector(e.target.value, styleBlock._id);
    if (!isValid) e.target.style.border = "1px solid #e74c3c";
    else {
      e.target.style.borderColor = "#bdc3c7";
      e.target.style.borderBottom = "none";
    }
  };

  const checkSelector = (selector, _id) => {
    if (selector.trim() === "") return false;
    let findSelector = styleBlocks.find(
      (item) => item.selector === selector && item._id !== _id
    );
    if (findSelector) return 0;
    return true;
  };

  const deleteBlock = (_id) => {
    let index = styleBlocks.findIndex((item) => item._id === _id);
    let styleBlock = JSON.stringify(styleBlocks[index]);
    addCommand({
      action: "moveStyleBlock",
      styleName: currentStyle.name,
      styleBlock: styleBlock,
      from: index,
      to: null,
    });
    moveStyleBlock(currentStyle.name, styleBlock, index, null);
  };

  const addProperty = (e, styleBlock) => {
    if (e.keyCode === 13) {
      let isValid = checkSelector(e.target.value, styleBlock._id);
      if (isValid) {
        let prevStyle = JSON.stringify(styleBlock);
        styleBlock.selector = e.target.value;
        styleBlock.isValid = Boolean(isValid);
        addCommand({
          action: "styleChange",
          styleName: currentStyle.name,
          blockId: styleBlock._id,
          style: JSON.stringify(styleBlock),
          prevStyle,
        });

        styleBlockChange(
          currentStyle.name,
          styleBlock._id,
          JSON.stringify(styleBlock)
        );
      }
      if (styleBlock.style.length === 0) {
        let update = styleBlocks.map((item, i) => {
          if (item._id === styleBlock._id) {
            item.style.push({
              name: "",
              value: "",
              isValid: false,
            });
          }
          return item;
        });
        setStyleBlocks((prev) => update);
      }
    }
  };

  return styleBlocks ? (
    <StyleContainer id="style-container">
      <StyleBlockList>
        {styleBlocks.map((styleBlock, i) => (
          <BlockContainer key={styleBlock._id}>
            <StyleHead>
              <StyleInput
                defaultValue={styleBlock.selector}
                onBlur={(e) => handleStyleBlock(e, styleBlock)}
                placeholder="Enter selector"
                onKeyDown={(e) => addProperty(e, styleBlock)}
                autoFocus={i + 1 === styleBlocks.length ? true : false}
                style={{
                  borderColor: !styleBlock.isValid ? "#e74c3c" : "#bdc3c7",
                  borderBottom: !styleBlock.isValid
                    ? "1px solid #e74c3c"
                    : "none",
                }}
              />
              <CloseButton
                onClick={(e) => deleteBlock(styleBlock._id)}
                title="Delete Style Block"
              >
                <CloseIcon />
              </CloseButton>
            </StyleHead>
            <StyleBlock data={styleBlock} currentStyle={currentStyle.name} />
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
