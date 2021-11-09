import React, { useEffect, useState } from "react";
import {
  Panel,
  PanelItems,
  PanelTitle,
} from "../../../../components/editor/Panel";
import { ElementsPanelItem } from "../../../../components/editor/LeftSection";

export function ElementsPanel({ isActive, elementList }) {
  const [elements, setElements] = useState();

  useEffect(() => {
    let list = Object.entries(elementList);
    setElements(list);
  }, [elementList]);

  return elements ? (
    <Panel className={isActive}>
      <PanelTitle>Elements</PanelTitle>
      <PanelItems cols={2}>
        {elements.map(([key, item], i) => {
          return (
            <ElementsPanelItem
              data-element={item.tagName}
              key={i}
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData("draggedElement", JSON.stringify(item));
                localStorage.setItem("draggedElement", JSON.stringify(item));
              }}
            >
              <div id="elementTag">&lt;{item.tagName}&gt;</div>
              <div id="elementName">{key}</div>
            </ElementsPanelItem>
          );
        })}
      </PanelItems>
    </Panel>
  ) : (
    "No Elements"
  );
}
