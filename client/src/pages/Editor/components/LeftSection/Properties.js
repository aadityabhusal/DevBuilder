import React, { useContext } from "react";
import {
  Panel,
  PanelTitle,
  PanelInputText,
  PanelTextArea,
  PanelLabel,
} from "../../../../components/editor/Panel";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
import { CommandContext } from "../../../../contexts/CommandContext";
import { NavigatorList } from "./NavigatorList";

export function PropertiesPanel({ isActive }) {
  const { addCommand } = useContext(CommandContext);
  const { changeProperty, selectedElement } = useContext(PageTreeContext);

  const handleAttribute = (e, property) => {
    let { children, ...element } = selectedElement.element;
    if (
      e.keyCode === 13 &&
      element.attributes[property].trim() !== e.target.value.trim()
    ) {
      let prev = JSON.stringify(element);
      element.attributes[property] = e.target.value;
      addCommand({
        action: "changeProperty",
        element: JSON.stringify(element),
        prev,
      });
      changeProperty(JSON.stringify(element));
    }
  };

  const handleProperty = (e, property) => {
    let { children, ...element } = selectedElement.element;
    if (
      e.keyCode === 13 &&
      (!element[property][0] ||
        element[property][0].trim() !== e.target.value.trim())
    ) {
      let prev = JSON.stringify(element);
      element[property][0] = e.target.value.trim();
      addCommand({
        action: "changeProperty",
        element: JSON.stringify(element),
        prev,
      });
      changeProperty(JSON.stringify(element));
    }
  };

  const handleData = (e, property) => {};

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
              key={`${i}${item[1]}`}
              defaultValue={item[1]}
              onKeyDown={(e) => handleAttribute(e, item[0])}
            />
          ))}
          {selectedElement.element.hasOwnProperty("text") && (
            <PanelTextArea
              rows={10}
              key={`${selectedElement.element.text}`}
              placeholder="Enter the text content"
              defaultValue={selectedElement.element.text}
              onKeyDown={(e) => handleProperty(e, "text")}
            ></PanelTextArea>
          )}
          {selectedElement.element.hasOwnProperty("data") && (
            <>
              <PanelLabel>Data</PanelLabel>
              <PanelInputText
                type="url"
                placeholder="Enter the url"
                onKeyDown={(e) => handleData(e, "url")}
              />
              <NavigatorList
                data={
                  selectedElement.element.children[
                    selectedElement.element.children_order[0]
                  ]
                }
                parentElement={{}}
                offset={selectedElement.element.children_order.length + 1}
              ></NavigatorList>
            </>
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
