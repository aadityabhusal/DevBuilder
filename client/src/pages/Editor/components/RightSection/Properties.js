import React, { useEffect, useState } from "react";
import {
  Panel,
  PanelButton,
  PanelTitle,
  PanelInputText,
  PanelTextArea,
  PanelLabel,
} from "../Panel";

export function PropertiesPanel({ isActive, target, setTarget }) {
  // const [tagName, setTagName] = useState("Select an element");
  // const [id, setId] = useState("");
  // const [classlist, setClasslist] = useState("");
  // const [text, setText] = useState("");

  const [element, setElement] = useState();

  useEffect(() => {
    if (target) {
      // setTagName(target.tagName);
      // setId(target.id);
      // setClasslist(target.classlist);
      // setText(target.text);
      setElement(() => {
        return target;
      });
    }
  }, [target]);

  const handleProperty = (e, property) => {
    setElement((prev, prop) => {
      return { ...prev, [property]: e.target.value };
    });
  };

  return element ? (
    <Panel className={isActive}>
      <PanelTitle>Properties</PanelTitle>
      <PanelLabel>
        <span>HTML Element:</span>
        <b style={{ marginLeft: "5px" }}>{`${element.tagName}`}</b>
      </PanelLabel>
      <PanelInputText
        type="text"
        id="elementId"
        data-elem-prop="id"
        placeholder="Enter the id"
        value={element.id}
        onChange={(e) => handleProperty(e, "id")}
      />
      <PanelInputText
        type="text"
        id="elementClass"
        data-elem-prop="class"
        placeholder="Enter the classes"
        value={element.classlist}
        onChange={(e) => handleProperty(e, "classlist")}
      />
      {element.tagName === "a" && (
        <PanelTextArea
          id="hrefLink"
          placeholder="Enter the link address"
          value={element.href}
          onChange={(e) => handleProperty(e, "href")}
        ></PanelTextArea>
      )}
      <PanelTextArea
        id="text"
        placeholder="Enter the text content"
        value={element.text}
        onChange={(e) => handleProperty(e, "text")}
      ></PanelTextArea>
      <PanelButton id="saveProps">Save</PanelButton>
    </Panel>
  ) : (
    <PanelLabel style={{ textAlign: "center", marginTop: "10px" }}>
      <b>Select an element</b>
    </PanelLabel>
  );
}
