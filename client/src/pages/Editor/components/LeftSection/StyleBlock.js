import { useEffect, useState } from "react";
import styled from "styled-components";
import { properties } from "../../lists/properties";
import { CloseIcon, CopyIcon, PasteIcon } from "../Icons";
import {
  getCSSArray,
  updateStyle,
  getStylePropertyName,
} from "../../../../utils";

export function StyleBlock({ data, currentStyle }) {
  const [propertyList, setPropertyList] = useState();

  useEffect(() => {
    setPropertyList((prev) => data);
  }, [data]);

  const handleProperty = (e, currentProperty, index) => {
    let isValid = checkProperty(e.target.value, index);
    if (!isValid) e.target.style.border = "1px solid #e74c3c";
    if (currentProperty.name === e.target.value) return;

    let update = { ...propertyList };
    update.style.forEach((item, i) => {
      if (item.name === currentProperty.name) {
        if (isValid === 0) {
          item.name = e.target.value.slice(0, -1);
        } else {
          item.name = e.target.value;
        }
        item.isValid = Boolean(isValid);
      }
    });

    setPropertyList((prev) => update);
  };

  const checkProperty = (value, index) => {
    if (!properties.includes(value)) return false;
    let foundSame = propertyList.style.find(
      (item, i) => item.name === value && i !== index
    );
    if (foundSame) return 0;
    return true;
  };

  const updateValue = (e, currentProperty) => {
    let update = { ...propertyList };
    update.style.forEach((item, i) => {
      if (item.name === currentProperty.name) {
        item.value = e.target.value;
      }
      let element = document.createElement("div");
      element.style[getStylePropertyName(currentProperty.name)] =
        e.target.value;
      if (element.style[getStylePropertyName(currentProperty.name)]) {
        updateStyle(currentStyle.name, currentStyle.styles);
      }
    });
    setPropertyList((prev) => update);
  };

  const addProperty = (e) => {
    let foundInvalid = propertyList.style.findIndex(
      (item) => item.isValid === false
    );
    if (e.keyCode === 13 && foundInvalid === -1) {
      let update = { ...propertyList };
      update.style.push({
        name: "",
        value: "",
        isValid: false,
      });

      setPropertyList((prev) => update);
    }
  };

  const deleteProperty = (propertyName) => {
    let update = { ...propertyList };
    let index = update.style.findIndex((item) => item.name === propertyName);
    update.style.splice(index, 1);
    updateStyle(currentStyle.name, currentStyle.styles);

    setPropertyList((prev) => update);
  };

  const pasteStyle = async () => {
    let pasteData = await navigator.clipboard.readText();
    let cssArray = getCSSArray(pasteData);
    if (cssArray) {
      let update = { ...propertyList };
      cssArray.forEach((element, j) => {
        let isValid = checkProperty(element[0], -1);
        if (isValid === false) return;
        if (isValid === 0) {
          let index = update.style.findIndex(
            (item) => item.name === element[0]
          );
          console.log(element[0], index);
          update.style[index].value = element[1];
          return;
        }
        update.style.push({
          name: element[0],
          value: element[1],
          isValid: true,
        });
      });

      setPropertyList((prev) => update);
    }
  };

  const copyStyle = async () => {
    let styleText = propertyList.style.map((item) => {
      return `${item.name}:${item.value};`;
    });
    await navigator.clipboard.writeText(styleText.join(""));
  };

  return propertyList ? (
    <StyleList>
      <PasteButton onClick={pasteStyle} title="Paste Style">
        <PasteIcon />
      </PasteButton>
      <CopyButton onClick={copyStyle} title="Copy Style">
        <CopyIcon />
      </CopyButton>
      {propertyList.style.map((item, i) => (
        <StyleListItem key={item.name}>
          <StyleInput
            list="properties-data-list"
            key={item.name}
            defaultValue={item.name}
            onBlur={(e) => handleProperty(e, item, i)}
            autocomplete="off"
            placeholder="Enter property name"
            autoFocus={item.isValid === false ? true : false}
          />
          <StyleInput
            className="value-input"
            value={item.value}
            onChange={(e) => updateValue(e, item)}
            placeholder="Enter property value"
            onKeyUp={addProperty}
            autoFocus={
              item.name && i + 1 === propertyList.style.length ? true : false
            }
          />
          <CloseButton
            title="Delete Property"
            onClick={(e) => deleteProperty(item.name)}
            type="prop"
          >
            <CloseIcon />
          </CloseButton>
        </StyleListItem>
      ))}
    </StyleList>
  ) : null;
}

const PasteButton = styled.div`
  margin-right: 10px;
  cursor: pointer;
  position: absolute;
  top: -30px;
  right: 20px;

  & > svg {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
`;

const CopyButton = styled(PasteButton)`
  right: 50px;
`;

const CloseButton = styled.div`
  cursor: pointer;
  border: 1px solid #bdc3c7;
  border-left: none;
  border-top: none;
  align-self: stretch;
  & > svg {
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
`;

const StyleInput = styled.input`
  padding: 5px;
  border: 1px solid #bdc3c7;
  outline: none;
  border-radius: 0;
  width: 170px;
  border-top: none;

  &.value-input {
    border-left: none;
    flex: 1;
  }
`;

const StyleList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  position: relative;
`;

const StyleListItem = styled.li`
  display: flex;
  align-items: center;
`;
