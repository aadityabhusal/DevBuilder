import React, { useEffect, useState } from "react";
import { Panel, PanelItem, PanelItems, PanelTitle } from "../Panel";

export function LayoutsPanel({ isActive, layoutList }) {
  const [layouts, setLayouts] = useState();

  useEffect(() => {
    const temp = [];
    for (const key in layoutList) {
      temp.push([key, layoutList[key]]);
    }
    setLayouts(temp);
  }, [layoutList]);

  return layouts ? (
    <Panel className={isActive}>
      <PanelTitle>Layouts</PanelTitle>
      <PanelItems cols={2}>
        {layouts.map((item, i) => {
          return (
            <PanelItem
              key={i}
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "draggedElement",
                  JSON.stringify(item[1])
                );
              }}
            >
              {item[0]}
            </PanelItem>
          );
        })}
      </PanelItems>
    </Panel>
  ) : (
    "No Layouts"
  );
}
