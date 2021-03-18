import React, { useEffect, useState } from "react";
import { Panel, PanelItems, PanelTitle, PanelItem } from "../Panel";

export function ElementsPanel({ isActive, elementList, selectElement }) {
  const [elements, setElements] = useState();

  // selectElement = (element) => {
  //   return element;
  // };

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
              onClick={(e) => selectElement(item)}
            >
              {item.text}
            </PanelItem>
          );
        })}
      </PanelItems>
    </Panel>
  ) : (
    "no elemts"
  );
}
