import React, { useContext } from "react";
import { SiteTreeContext } from "../../../../contexts/SiteTreeContext";
import { SelectedElementContext } from "../../../../contexts/SelectedElementContext";
import {
  Panel,
  PanelButton,
  PanelTitle,
  PanelInputText,
  PanelTextArea,
  PanelLabel,
} from "../Panel";

export function PropertiesPanel({ isActive }) {
  const { selectedElement, setSelectedElement } = useContext(
    SelectedElementContext
  );
  // const { updateTree } = useContext(SiteTreeContext);

  const handleAttribute = (e, property) => {
    setSelectedElement((prev, prop) => {
      let temp = { ...prev };
      temp.attributes[property] = e.target.value;
      return temp;
    });
  };

  const handleClasses = (e, pos) => {
    setSelectedElement((prev, prop) => {
      let temp = { ...prev };
      temp.classes[pos] = e.target.value;
      return temp;
    });
  };

  const addClass = (e) => {
    setSelectedElement((prev, prop) => {
      let temp = { ...prev };
      temp.classes.push("");
      return temp;
    });
  };
  /* 
    TEXT FIELD NOT UPDATING
  */
  const handleProperty = (e, property) => {
    setSelectedElement((prev, prop) => {
      let temp = { ...prev };
      temp[property][0] = e.target.value;
      return temp;
    });
  };

  // const handleSave = (e) => {
  //   setSelectedElement((prev, prop) => {
  //     let temp = { ...prev };
  //     temp.classes = temp.classes.filter(Boolean);
  //     return temp;
  //   });
  //   updateTree(selectedElement);
  // };

  return (
    <Panel className={isActive}>
      <PanelTitle>Properties</PanelTitle>
      {selectedElement ? (
        <>
          <PanelLabel>
            <span>HTML Element:</span>
            <b style={{ marginLeft: "5px" }}>{`${selectedElement.tagName}`}</b>
          </PanelLabel>
          {Object.entries(selectedElement.attributes).map((item, i) => (
            <PanelInputText
              type="text"
              data-elem-prop={item[0]}
              placeholder={`Enter the ${item[0]}`}
              key={i}
              value={item[1]}
              onChange={(e) => handleAttribute(e, item[0])}
            />
          ))}
          <PanelLabel>Classes</PanelLabel>
          {selectedElement.classes.map((item, i) => {
            return (
              <PanelInputText
                type="text"
                data-elem-prop={`class${i}`}
                placeholder="Enter a class name"
                key={i}
                value={item}
                onChange={(e) => handleClasses(e, i)}
              />
            );
          })}
          <PanelButton id="" onClick={addClass}>
            Add Class
          </PanelButton>
          {selectedElement.hasOwnProperty("text") && (
            <PanelTextArea
              rows={10}
              placeholder="Enter the text content"
              value={selectedElement.text}
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
