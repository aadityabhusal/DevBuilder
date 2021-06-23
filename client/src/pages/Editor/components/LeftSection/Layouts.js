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

  function handleDrag(e, element) {
    /* Element item collapses sometimes */
    let result = getResult(element);
    e.dataTransfer.setData("draggedElement", JSON.stringify(result.item));
  }

  function getResult(element) {
    let results = {};
    if (element.children && Object.keys(element.children).length) {
      for (const key in element.children) {
        let { id, item } = getResult(element.children[key]);
        results[id] = item;
        item._id = id;
      }
    } else {
      let id = (performance.now() + Math.random())
        .toString(36)
        .replace(/\./g, "");
      element._id = id;
      return { id, item: element };
    }
    return {
      id: (performance.now() + Math.random()).toString(36).replace(/\./g, ""),
      item: {
        ...element,
        children_order: Object.keys(results),
        children: results,
      },
    };
  }

  return layouts ? (
    <Panel className={isActive}>
      <PanelTitle>Layouts</PanelTitle>
      <PanelItems cols={2}>
        {layouts.map((item, i) => {
          return (
            <PanelItem
              key={i}
              draggable={true}
              onDragStart={(e) => handleDrag(e, item[1])}
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
