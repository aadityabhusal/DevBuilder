import { useContext, useEffect, useState } from "react";
import { properties } from "../../lists/properties";
import { CommandContext } from "../../../../contexts/CommandContext";
import {
  CloseIcon,
  CopyIcon,
  PasteIcon,
} from "../../../../components/ui/Icons";
import { getCSSArray, getStylePropertyName } from "../../../../utils";
import {
  CloseButton,
  CopyButton,
  PasteButton,
  StyleInput,
  StyleList,
  StyleListItem,
} from "../../../../components/editor/StyleBlock";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";

export function StyleBlock({ data, blockKey, currentStyle }) {
  const [propertyList, setPropertyList] = useState();
  const { addCommand } = useContext(CommandContext);
  const { stylePropertyChange } = useContext(PageTreeContext);

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

  function checkValue(prop, val, prev) {
    if (prev.trim() === val.trim()) return false;
    let element = document.createElement("div");
    if (val.includes(" !important")) {
      let value = val.replace(" !important", "");
      element.style.setProperty(prop, value, "important");
    } else element.style.setProperty(prop, val);

    if (element.style[getStylePropertyName(prop)]) return true;
    return false;
  }

  const updateValue = (e, currentProperty) => {
    let update = { ...propertyList };
    let prevStyle = JSON.stringify(currentStyle.styles);
    update.style.forEach((item, i) => {
      if (item.name === currentProperty.name) {
        let prev = item.value;
        item.value = e.target.value;

        let isValid = checkValue(currentProperty.name, e.target.value, prev);
        if (isValid) {
          let newStyle = JSON.stringify(currentStyle.styles);
          if (newStyle !== prevStyle) {
            addCommand({
              action: "styleChange",
              style: currentStyle,
              prevStyle,
            });
            stylePropertyChange(currentStyle.name, blockKey, i, item);
          }
        }
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
    stylePropertyChange(currentStyle.name, blockKey, index);

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
