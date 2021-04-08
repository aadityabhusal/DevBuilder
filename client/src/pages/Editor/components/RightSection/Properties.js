import React, { useContext, useEffect, useState } from "react";
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
import styled from "styled-components";

const ClassesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  & input {
    margin-left: 10px;
    padding: 5px;
  }

  & button {
    padding: 5px;
    margin-left: 10px;
  }
`;

export function PropertiesPanel({ isActive }) {
  const [element, setElement] = useState();
  let [selectedElement, setSelectedElement] = useContext(
    SelectedElementContext
  );
  let [, updateTree, saveSite] = useContext(SiteTreeContext);

  useEffect(() => {
    if (selectedElement) {
      setElement((prev, prop) => {
        return selectedElement;
      });
    }
  }, [selectedElement]);

  const handleAttribute = (e, property) => {
    setElement((prev, prop) => {
      let temp = { ...prev };
      temp.attributes[property] = e.target.value;
      return temp;
    });
  };

  const handleClasses = (e, pos) => {
    setElement((prev, prop) => {
      let temp = { ...prev };
      temp.classes[pos] = e.target.value;
      return temp;
    });
  };

  const addClass = (e) => {
    setElement((prev, prop) => {
      let temp = { ...prev };
      temp.classes.push("");
      return temp;
    });
  };

  const handleProperty = (e, property) => {
    setElement((prev, prop) => {
      let temp = { ...prev };
      temp[property] = e.target.value;
      console.log(temp);
      return temp;
    });
  };

  const handleSave = (e) => {
    setElement((prev, prop) => {
      let temp = { ...prev };
      temp.classes = temp.classes.filter(Boolean);
      return temp;
    });
    updateTree(element);
    saveSite();
  };

  return (
    <Panel className={isActive}>
      <PanelTitle>Properties</PanelTitle>
      {element ? (
        <>
          <PanelLabel>
            <span>HTML Element:</span>
            <b style={{ marginLeft: "5px" }}>{`${element.tagName}`}</b>
          </PanelLabel>
          <ClassesContainer>
            <PanelLabel>Classes</PanelLabel>
            {element.classes.map((item, i) => {
              return (
                <PanelInputText
                  type="text"
                  data-elem-prop={`class${i}`}
                  placeholder="Enter the classes"
                  key={i}
                  value={item}
                  onChange={(e) => handleClasses(e, i)}
                />
              );
            })}
            <PanelButton id="" onClick={addClass}>
              Add Class
            </PanelButton>
          </ClassesContainer>
          {Object.entries(element.attributes).map((item, i) => (
            <PanelInputText
              type="text"
              data-elem-prop={item[0]}
              placeholder={`Enter the ${item[0]}`}
              key={i}
              value={item[1]}
              onChange={(e) => handleAttribute(e, item[0])}
            />
          ))}
          {element.hasOwnProperty("text") && (
            <PanelTextArea
              placeholder="Enter the text content"
              value={element.text}
              onChange={(e) => handleProperty(e, "text")}
            ></PanelTextArea>
          )}

          <PanelButton id="saveProps" onClick={handleSave}>
            Save
          </PanelButton>
        </>
      ) : (
        <PanelLabel style={{ textAlign: "center", marginTop: "10px" }}>
          <b>Select an element</b>
        </PanelLabel>
      )}
    </Panel>
  );
}
