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

export function StyleBlock({ data, currentStyle, update }) {
  const [propertyList, setPropertyList] = useState();
  const { addCommand } = useContext(CommandContext);
  const { pageTree, styleBlockChange } = useContext(PageTreeContext);
  let styles = pageTree.head.style[currentStyle].styles;
  let style = styles.find((item) => item._id === data._id);

  useEffect(() => {
    setPropertyList((prev) => style.style);
  }, [style]);

  const handleProperty = (e, currentProperty, index) => {
    let isValid = checkProperty(e.target.value, index);
    if (currentProperty.name !== e.target.value)
      e.target.nextSibling.value = "";
    if (currentProperty.name === e.target.value) return;

    let update = propertyList.map((item, i) => {
      if (item.name === currentProperty.name) {
        item.name = e.target.value;
        item.isValid = true;
        if (!isValid) {
          item.isValid = false;
        }
      }
      return item;
    });

    setPropertyList((prev) => update);
  };

  const checkProperty = (value, index) => {
    if (!properties.includes(value)) return false;
    let foundSame = propertyList.find(
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
    let item = propertyList[index];
    if (!item.isValid) return;
    let prev = item.value;
    let isValid = checkValue(item.name, e.target.value, prev);

    if (isValid) {
      let update = propertyList.map((prop) => {
        if (prop.name === item.name) {
          prop.value = e.target.value;
          prop.isValid = true;
        }
        return prop;
      });

      let style = JSON.stringify({ ...data, style: update });

      setPropertyList((prev) => update);

      addCommand({
        action: "styleChange",
        styleName: currentStyle,
        blockId: data._id,
        style,
        prevStyle,
      });

      styleBlockChange(currentStyle, data._id, style);
    }
  };

  const addProperty = (e, index) => {
    if (e.keyCode === 13) {
      let foundInvalid = propertyList.findIndex((item) => !item.isValid);
      if (foundInvalid === -1 && propertyList[index].value === e.target.value) {
        // let update = Object.assign({}, propertyList);
        let list = [...propertyList];
        list.push({
          name: "",
          value: "",
          isValid: false,
        });
        // let update = propertyList.slice().concat();
        setPropertyList((prev) => list);
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
      blockId: data._id,
      style: JSON.stringify(update),
      prevStyle,
    });
    styleBlockChange(currentStyle, data._id, JSON.stringify(update));
  };

  const pasteStyle = async () => {
    let prevStyle = JSON.stringify(data);
    let pasteData = await navigator.clipboard.readText();
    let cssArray = getCSSArray(pasteData);
    let foundInvalid = propertyList.findIndex((item) => !item.isValid);
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
        blockId: data._id,
        style: JSON.stringify(update),
        prevStyle,
      });

      styleBlockChange(currentStyle, data._id, JSON.stringify(update));
    }
  };

  const copyStyle = async () => {
    let styleText = propertyList.map((item) => {
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
      {propertyList.map((item, i) => (
        <StyleListItem key={`${i}${propertyList.length}`}>
          <StyleInput
            list="properties-data-list"
            key={`name${item.name}${i}${propertyList.length}`}
            defaultValue={item.name}
            onBlur={(e) => handleProperty(e, item, i)}
            autocomplete="off"
            placeholder="Enter property name"
            autoFocus={!item.isValid ? true : false}
            style={{
              borderColor: !item.isValid ? "#e74c3c" : "#bdc3c7",
              borderTop: !item.isValid ? "1px solid #e74c3c" : "none",
            }}
          />
          <StyleInput
            key={`value${item.value}${i}${propertyList.length}`}
            className="value-input"
            defaultValue={item.value}
            placeholder="Enter property value"
            onKeyUp={(e) => addProperty(e, i)}
            autoFocus={
              item.name && i + 1 === propertyList.length ? true : false
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
