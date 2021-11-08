import React, { useContext } from "react";
import { SelectedElementContext } from "../../../../contexts/SelectedElementContext";
import {
  Panel,
  PanelTitle,
  PanelInputText,
  PanelTextArea,
  PanelLabel,
} from "../../../../components/editor/Panel";

export function PropertiesPanel({ isActive }) {
  const { selectedElement, setSelectedElement } = useContext(
    SelectedElementContext
  );

  const handleAttribute = (e, property) => {
    setSelectedElement((prev, prop) => {
      let temp = { ...prev };
      temp.element.attributes[property] = e.target.value;
      return temp;
    });
  };

  const handleProperty = (e, property) => {
    setSelectedElement((prev, prop) => {
      let temp = { ...prev };
      temp.element[property][0] = e.target.value;
      return temp;
    });
  };

  return (
    <Panel className={isActive}>
      <PanelTitle>Properties</PanelTitle>
      {selectedElement ? (
        <>
          <PanelLabel>
            <span>HTML Element:</span>
            <b
              style={{ marginLeft: "5px" }}
            >{`${selectedElement.element.tagName}`}</b>
          </PanelLabel>
          {Object.entries(selectedElement.element.attributes).map((item, i) => (
            <PanelInputText
              type="text"
              data-elem-prop={item[0]}
              placeholder={`Enter the ${item[0]}`}
              key={i}
              value={item[1]}
              onChange={(e) => handleAttribute(e, item[0])}
            />
          ))}
          {selectedElement.element.hasOwnProperty("text") && (
            <PanelTextArea
              rows={10}
              placeholder="Enter the text content"
              value={selectedElement.element.text}
              onChange={(e) => handleProperty(e, "text")}
            ></PanelTextArea>
          )}
        </>
      ) : (
        <PanelLabel style={{ textAlign: "center", marginTop: "10px" }}>
          <b>Select an element</b>
        </PanelLabel>
      )}
    </Panel>
  );
}
