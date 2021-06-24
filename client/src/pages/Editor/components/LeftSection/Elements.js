import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Panel, PanelItems, PanelTitle, PanelItem } from "../Panel";

const ElementsPanelItem = styled(PanelItem)`
  font-size: 16px;
  font-weight: 500;
`;

export function ElementsPanel({ isActive, elementList }) {
  const [elements, setElements] = useState();

  useEffect(() => {
    const temp = [];
    for (const key in elementList) {
      temp.push(elementList[key]);
    }
    setElements(temp);
  }, [elementList]);

  return elements ? (
    <Panel className={isActive}>
      <PanelTitle>Elements</PanelTitle>
      <PanelItems cols={2}>
        {elements.map((item, i) => {
          return (
            <ElementsPanelItem
              data-element={item.tagName}
              key={i}
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData("draggedElement", JSON.stringify(item));
              }}
            >
              &lt;{item.tagName}&gt;
            </ElementsPanelItem>
          );
        })}
      </PanelItems>
    </Panel>
  ) : (
    "No Elements"
  );
}
