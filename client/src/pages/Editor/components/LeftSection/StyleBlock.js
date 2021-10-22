import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { properties } from "../../lists/properties";
import { CloseIcon } from "../Icons";

export function StyleBlock({
  data,
  selectorList,
  handleStyleBlock,
  deleteBlock,
}) {
  const [propertyList, setPropertyList] = useState();
  const [currentProperty, setCurrentProperty] = useState({});

  useEffect(() => {
    setPropertyList((prev) => data.style);
  }, [data]);

  const checkSelector = (e) => {
    e.target.style.borderBottom = "none";
    e.target.style.borderColor = "#bdc3c7";
    let isValid = true;
    let selector = e.target.value;

    let findSelector = selectorList.findIndex((item) => item === selector);

    if (
      e.target.value === "" ||
      (findSelector !== -1 && findSelector !== data.order)
    ) {
      e.target.style.border = "1px solid #e74c3c";
      isValid = false;
    }
    handleStyleBlock({
      isValid,
      selector,
      order: data.order,
      prev: data.selector,
      style: propertyList,
    });
  };

  const handleCurrentProperty = (item) => {
    if (currentProperty.name !== item.name) {
      setCurrentProperty(item);
    }
  };

  const checkProperty = (e) => {
    e.target.style.borderTop = "none";
    e.target.style.borderColor = "#bdc3c7";

    if (!properties.includes(e.target.value))
      e.target.style.border = "1px solid #e74c3c";

    if (currentProperty.name === e.target.value) return;

    setPropertyList((prev) => {
      let temp = [...prev];
      let update = temp.map((item, i) => {
        if (item.name === currentProperty.name) {
          let foundSame = temp.findIndex(
            (item) => item.name === e.target.value
          );
          if (foundSame !== -1 && foundSame !== currentProperty.order) {
            let val = e.target.value.slice(0, -1);
            item.name = val;
            item.isValid = false;
            e.target.value = val;
          } else {
            item.name = e.target.value;
            item.isValid = true;
          }
        }
        if (!properties.includes(item.name)) {
          item.isValid = false;
          e.target.style.border = "1px solid #e74c3c";
        }
        return item;
      });
      return update;
    });
  };

  const updateValue = (e) => {
    setPropertyList((prev) => {
      let temp = [...prev];
      let update = temp.map((item) => {
        if (item.name === currentProperty.name) {
          item.value = e.target.value;
        }
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
    handleStyleBlock({
      ...data,
      prev: data.selector,
      style: propertyList.filter((item) => item.order !== order),
    });
  };

  const handleParent = () => {
    if (data.isValid) {
      handleStyleBlock({
        ...data,
        prev: data.selector,
        style: propertyList,
      });
    }
  };

  return propertyList ? (
    <BlockContainer>
      <StyleHead>
        <StyleInput
          className="selector-input"
          key={data.selector}
          defaultValue={data.selector}
          onBlur={checkSelector}
          placeholder="Enter selector"
          onKeyDown={(e) => addProperty(e, -1)}
          autoFocus={propertyList.length === 0 ? true : false}
        />
        <CloseButton onClick={(e) => deleteBlock(data.order)} type="block">
          <CloseIcon />
        </CloseButton>
      </StyleHead>
      <StyleList>
        {propertyList.map((item) => (
          <StyleListItem key={item.order}>
            <StyleInput
              list="properties-data-list"
              key={item.name}
              defaultValue={item.name}
              onFocus={(e) => handleCurrentProperty(item)}
              onBlur={checkProperty}
              autocomplete="off"
              placeholder="Enter property name"
              autoFocus={item.isValid === false ? true : false}
            />
            <StyleInput
              className="value-input"
              value={item.value}
              onFocus={(e) => handleCurrentProperty(item)}
              onChange={updateValue}
              onBlur={handleParent}
              placeholder="Enter property value"
              onKeyUp={(e) => addProperty(e, item.order)}
            />
            <CloseButton
              onClick={(e) => deleteProperty(item.order)}
              type="prop"
            >
              <CloseIcon />
            </CloseButton>
          </StyleListItem>
        ))}
      </StyleList>
      <PropertiesDataList id="properties-data-list">
        {properties.map((item, i) => (
          <option value={item} key={i} />
        ))}
      </PropertiesDataList>
    </BlockContainer>
  ) : null;
}

const BlockContainer = styled.div`
  border-bottom: 1px solid #bdc3c7;
  padding: 10px;

  &.selected-block {
    background-color: #ecf0f1;
  }
`;

const StyleHead = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #bdc3c7;
`;

const CloseButton = styled.div`
  cursor: pointer;
  ${({ type }) =>
    type === "prop" &&
    css`
      border: 1px solid #bdc3c7;
      border-left: none;
      border-top: none;
      align-self: stretch;
      & > svg {
        width: 18px;
        height: 18px;
        vertical-align: middle;
      }
    `}
`;

const StyleInput = styled.input`
  padding: 5px;
  border: 1px solid #bdc3c7;
  outline: none;
  border-radius: 0;
  width: 170px;
  border-top: none;

  &.selector-input {
    border-bottom: none;
    border-top: 1px solid #bdc3c7;
  }

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

const PropertiesDataList = styled.datalist`
  background-color: red;

  option {
    background-color: red;
  }
`;
