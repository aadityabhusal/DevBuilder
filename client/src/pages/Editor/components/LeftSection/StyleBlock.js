import { useEffect, useState } from "react";
import styled from "styled-components";
import { properties } from "../../lists/properties";
import { CloseIcon } from "../Icons";
import { getCSSText, updateStyle } from "../../../../utils";

/* 
  Stop sending updates to the parent element for updates related to properties and values
  Handle them here and update the tree with pass by reference
*/

export function StyleBlock({ data, currentStyle }) {
  const [propertyList, setPropertyList] = useState();

  useEffect(() => {
    setPropertyList((prev) => data.style);
  }, [data]);

  const handleProperty = (e, currentProperty) => {
    let isValid = checkProperty(e.target.value, currentProperty.order);
    if (!isValid) e.target.style.border = "1px solid #e74c3c";
    if (currentProperty.name === e.target.value) return;

    setPropertyList((prev) => {
      let update = prev.map((item, i) => {
        if (item.name === currentProperty.name) {
          if (!isValid) {
            let val = e.target.value.slice(0, -1);
            item.name = val;
            e.target.value = val;
          } else {
            item.name = e.target.value;
            data.style[i] = item;
          }
          item.isValid = isValid;
        }
        updateStyle(currentStyle.name, currentStyle.styles, getCSSText);
        return item;
      });
      return update;
    });
  };

  const checkProperty = (value, order) => {
    if (!properties.includes(value)) return false;
    let foundSame = propertyList.find(
      (item) => item.name === value && item.order !== order
    );
    if (foundSame) return false;
    return true;
  };

  const updateValue = (e, currentProperty) => {
    setPropertyList((prev) => {
      let temp = [...prev];
      let update = temp.map((item, i) => {
        if (item.name === currentProperty.name) {
          item.value = e.target.value;
          data.style[i] = currentProperty;
        }
        updateStyle(currentStyle.name, currentStyle.styles, getCSSText);
        return item;
      });
      return update;
    });
  };

  const addProperty = (e, index) => {
    let foundInvalid = propertyList.findIndex((item) => item.isValid === false);
    if (
      e.keyCode === 13 &&
      foundInvalid === -1 &&
      index === propertyList.length - 1
    ) {
      setPropertyList((prev) => {
        let temp = [...prev];
        temp.push({
          name: "",
          value: "",
          isValid: false,
          order: prev.length,
        });
        return temp;
      });
    }
  };

  const deleteProperty = (order) => {
    console.log("OK");
    setPropertyList((prev) => {
      let temp = prev.filter((item) => item.order !== order);
      data.style = temp;
      updateStyle(currentStyle.name, currentStyle.styles, getCSSText);
      return temp;
    });
  };

  return propertyList ? (
    <StyleList>
      {propertyList.map((item) => (
        <StyleListItem key={item.order}>
          <StyleInput
            list="properties-data-list"
            key={item.name}
            defaultValue={item.name}
            onBlur={(e) => handleProperty(e, item)}
            autocomplete="off"
            placeholder="Enter property name"
            autoFocus={item.isValid === false ? true : false}
          />
          <StyleInput
            className="value-input"
            value={item.value}
            onChange={(e) => updateValue(e, item)}
            placeholder="Enter property value"
            onKeyUp={(e) => addProperty(e, item.order)}
          />
          <CloseButton onClick={(e) => deleteProperty(item.order)} type="prop">
            <CloseIcon />
          </CloseButton>
        </StyleListItem>
      ))}
    </StyleList>
  ) : null;
}

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
`;

const StyleListItem = styled.li`
  display: flex;
  align-items: center;
`;
