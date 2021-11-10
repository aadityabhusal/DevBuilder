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
  const { styleBlockChange } = useContext(PageTreeContext);

  useEffect(() => {
    setPropertyList((prev) => data);
  }, [data]);

  const handleProperty = (e, index) => {
    let isValid = checkProperty(e.target.value, index);
    let { style, ...data } = Object.assign({}, propertyList);
    if (style[index].name !== e.target.value) e.target.nextSibling.value = "";
    if (style[index].name === e.target.value) return;

    style[index].name = e.target.value;
    style[index].isValid = true;
    if (!isValid) {
      style[index].isValid = false;
    }
    setPropertyList((prev) => ({ style, ...data }));
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

  const updateValue = (e, index) => {
    let prevStyle = JSON.stringify(data);
    let update = Object.assign({}, propertyList);
    let item = update.style[index];
    if (!item.isValid) return;
    let prev = item.value;
    let isValid = checkValue(item.name, e.target.value, prev);
    if (isValid) {
      item.value = e.target.value;
      item.isValid = true;

      addCommand({
        action: "styleChange",
        styleName: currentStyle,
        blockKey,
        style: JSON.stringify(update),
        prevStyle,
      });

      styleBlockChange(currentStyle, blockKey, JSON.stringify(update));
    }
  };

  const addProperty = (e, index) => {
    if (e.keyCode === 13) {
      let foundInvalid = propertyList.style.findIndex((item) => !item.isValid);
      if (
        foundInvalid === -1 &&
        propertyList.style[index].value === e.target.value
      ) {
        let update = Object.assign({}, propertyList);
        update.style.push({
          name: "",
          value: "",
          isValid: false,
        });
        setPropertyList((prev) => update);
      } else {
        updateValue(e, index);
      }
    }
  };

  const deleteProperty = (propertyName) => {
    let prevStyle = JSON.stringify(data);
    let update = Object.assign({}, propertyList);
    let index = update.style.findIndex((item) => item.name === propertyName);
    update.style.splice(index, 1);
    addCommand({
      action: "styleChange",
      styleName: currentStyle,
      blockKey,
      style: JSON.stringify(update),
      prevStyle,
    });
    styleBlockChange(currentStyle, blockKey, JSON.stringify(update));

    setPropertyList((prev) => update);
  };

  const pasteStyle = async () => {
    let prevStyle = JSON.stringify(data);
    let pasteData = await navigator.clipboard.readText();
    let cssArray = getCSSArray(pasteData);
    let foundInvalid = propertyList.style.findIndex((item) => !item.isValid);
    if (cssArray && foundInvalid === -1) {
      let update = Object.assign({}, propertyList);
      cssArray.forEach((element, j) => {
        let isValid = checkProperty(element[0], -1);
        if (isValid === false) return;
        if (isValid === 0) {
          let index = update.style.findIndex(
            (item) => item.name === element[0]
          );
          if (!checkValue(element[0], element[1], update.style[index].value))
            return;
          update.style[index].value = element[1];
          return;
        }
        update.style.push({
          name: element[0],
          value: element[1],
          isValid: true,
        });
      });

      addCommand({
        action: "styleChange",
        styleName: currentStyle,
        blockKey,
        style: JSON.stringify(update),
        prevStyle,
      });

      styleBlockChange(currentStyle, blockKey, JSON.stringify(update));
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
        <StyleListItem key={i}>
          <StyleInput
            list="properties-data-list"
            key={`name${item.name}${i}`}
            defaultValue={item.name}
            onBlur={(e) => handleProperty(e, i)}
            autocomplete="off"
            placeholder="Enter property name"
            autoFocus={!item.isValid ? true : false}
            style={{
              borderColor: !item.isValid ? "#e74c3c" : "#bdc3c7",
              borderTop: !item.isValid ? "1px solid #e74c3c" : "none",
            }}
          />
          <StyleInput
            key={`value${item.value}${i}`}
            className="value-input"
            defaultValue={item.value}
            placeholder="Enter property value"
            onKeyUp={(e) => addProperty(e, i)}
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
