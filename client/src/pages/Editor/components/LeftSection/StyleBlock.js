import { useEffect, useState } from "react";
import styled from "styled-components";
import { properties } from "../../lists/properties";
import { CloseIcon } from "../Icons";

/* 
  Stop sending updates to the parent element for updates related to properties and values
  Handle them here and update the tree with pass by reference
*/

export function StyleBlock({ data }) {
  const [propertyList, setPropertyList] = useState();
  const [currentProperty, setCurrentProperty] = useState({});

  useEffect(() => {
    setPropertyList((prev) => data.style);
  }, [data]);

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
            data.style[item.order] = item;
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
    setPropertyList((prev) => {
      let temp = [...prev];
      temp.filter((item) => item.order !== order);
      data.style = temp;
      return temp;
    });
    // handleStyleBlock({
    //   ...data,
    //   prev: data.selector,
    //   style: propertyList.filter((item) => item.order !== order),
    // });
  };

  return propertyList ? (
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
