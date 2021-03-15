import React, { useEffect, useState } from "react";
import {
  Panel,
  PanelButton,
  PanelTitle,
  PanelInputText,
  PanelTextArea,
  PanelItem,
} from "../Panel";

export function PropertiesPanel({ isActive, target, setTarget }) {
  const [tagName, setTagName] = useState("");
  const [id, setId] = useState("");
  const [classlist, setClasslist] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (target) {
      setTagName(target.tagName);
      setId(target.id);
      setClasslist(target.classlist);
      setText(target.text);
    }
  }, [target]);

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handleClasslist = (e) => {
    setClasslist(e.target.value);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  return (
    <Panel className={isActive}>
      <PanelTitle>Properties</PanelTitle>
      <PanelItem style={{ textAlign: "left", paddingLeft: "5px" }}>
        <span>HTML Element:</span>
        <b style={{ marginLeft: "5px" }}>{`${tagName}`}</b>
      </PanelItem>
      <PanelInputText
        type="text"
        id="elementId"
        data-elem-prop="id"
        placeholder="Enter the id"
        value={id}
        onChange={handleId}
      />
      <PanelInputText
        type="text"
        id="elementClass"
        data-elem-prop="class"
        placeholder="Enter the classes"
        value={classlist}
        onChange={handleClasslist}
      />
      <PanelTextArea
        id="text"
        placeholder="Enter the text content"
        value={text}
        onChange={handleText}
      ></PanelTextArea>
      <PanelButton id="saveProps">Save</PanelButton>
    </Panel>
  );
}
