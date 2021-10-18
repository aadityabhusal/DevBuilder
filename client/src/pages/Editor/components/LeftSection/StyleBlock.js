import { useState } from "react";
import styled from "styled-components";
import { properties } from "../../lists/properties";

export function StyleBlock({ data }) {
  const [selector, setSelector] = useState(data.selector);
  const [propertyList, setPropertyList] = useState(data.style);
  const [currentProperty, setCurrentProperty] = useState([]);

  const updateSelector = (e) => {
    setSelector(e.target.value);
  };

  const handleCurrentProperty = (item, i) => {
    if (currentProperty[0] !== item[0]) {
      setCurrentProperty([...item, i]);
    }
  };

  const checkProperty = (e) => {
    e.target.style.borderTop = "none";
    e.target.style.borderColor = "#bdc3c7";

    if (currentProperty[0] === e.target.value) return;

    let update = propertyList.map((item, i) => {
      if (item[0] === currentProperty[0]) {
        let foundSame = propertyList.findIndex(
          (item) => item[0] === e.target.value
        );
        if (foundSame !== -1 && foundSame !== currentProperty[3]) {
          let val = e.target.value.slice(0, -1);
          item[0] = val;
          item[2] = false;
          e.target.value = val;
        } else {
          item[0] = e.target.value;
          item[2] = true;
        }
      }
      /* and index is not equals to current item */
      if (!properties.includes(item[0])) {
        item[2] = false;
        e.target.style.border = "1px solid #e74c3c";
      }
      return item;
    });

    setPropertyList(update);
  };

  const updateValue = (e) => {
    setPropertyList((prev) => {
      let update = prev.map((item) => {
        if (item[0] === currentProperty[0]) {
          item[1] = e.target.value;
        }
        return item;
      });
      return update;
    });
  };

  const addProperty = (e, index) => {
    let foundInvalid = propertyList.find((item) => item[2] === false);
    if (
      e.keyCode === 13 &&
      index === propertyList.length - 1 &&
      !foundInvalid
    ) {
      setPropertyList((prev) => {
        let temp = [...prev];
        temp.push(["", "", false]);
        return temp;
      });
    }
  };

  return (
    <BlockContainer>
      <StyleHead>
        <StyleInput
          className="selector-input"
          value={selector}
          onChange={updateSelector}
          placeholder="Enter selector"
          onKeyDown={(e) => addProperty(e, -1)}
          autoFocus={propertyList.length === 0 ? true : false}
        />
      </StyleHead>
      <StyleList>
        {propertyList.map((item, i) => (
          <StyleListItem key={i}>
            <StyleInput
              list="properties-data-list"
              defaultValue={item[0]}
              onFocus={(e) => handleCurrentProperty(item, i)}
              onBlur={checkProperty}
              autocomplete="off"
              placeholder="Enter property name"
              autoFocus={item[2] === false ? true : false}
            />
            <StyleInput
              className="value-input"
              value={item[1]}
              onFocus={(e) => handleCurrentProperty(item, i)}
              onChange={updateValue}
              placeholder="Enter property value"
              onKeyUp={(e) => addProperty(e, i)}
            />
          </StyleListItem>
        ))}
      </StyleList>
      <PropertiesDataList id="properties-data-list">
        {properties.map((item, i) => (
          <option value={item} key={i} />
        ))}
      </PropertiesDataList>
    </BlockContainer>
  );
}

const BlockContainer = styled.div`
  border-bottom: 1px solid #bdc3c7;
  padding: 10px;

  &.selected-block {
    background-color: #ecf0f1;
  }
`;

const StyleHead = styled.div`
  border-bottom: 1px solid #bdc3c7;
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
`;

const PropertiesDataList = styled.datalist`
  background-color: red;

  option {
    background-color: red;
  }
`;
