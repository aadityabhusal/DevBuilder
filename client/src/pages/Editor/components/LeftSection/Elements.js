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
              &lt;{key}&gt;
            </ElementsPanelItem>
          );
        })}
      </PanelItems>
    </Panel>
  ) : (
    "No Elements"
  );
}
