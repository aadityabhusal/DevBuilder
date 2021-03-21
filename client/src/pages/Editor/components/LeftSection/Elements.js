import React, { useEffect, useState } from "react";
import { Panel, PanelItems, PanelTitle, PanelItem } from "../Panel";

export function ElementsPanel({ isActive, elementList }) {
  const [elements, setElements] = useState();

  useEffect(() => {
    const temp = [];
    for (const key in elementList) {
      if (Object.hasOwnProperty.call(elementList, key)) {
        temp.push(elementList[key]);
      }
    }
    setElements(temp);
  }, [elementList]);

  return elements ? (
    <Panel className={isActive}>
      <PanelTitle>Elements</PanelTitle>
      <PanelItems cols={2}>
        {elements.map((item, i) => {
          return (
            <PanelItem
              data-element={item.tagName}
              key={i}
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData("draggedElement", JSON.stringify(item));
              }}
            >
              {item.text}
            </PanelItem>
          );
        })}
      </PanelItems>
    </Panel>
  ) : (
    "No Elements"
  );
}
