import React, { useState } from "react";
import styled from "styled-components";
import { ElementsIcon, LayoutsIcon, NavigatorIcon, PagesIcon } from "../Icons";

import { Panels, PanelList } from "../Panel";
import { ElementsPanel } from "./Elements";
import { LayoutsPanel } from "./Layouts";
import { NavigatorPanel } from "./Navigator";
import { PagesPanel } from "./Pages";

import elementList from "./elements.json";
import layoutList from "./layouts.json";

const LeftContainer = styled.div`
  border-right: 1px solid #bdc3c7;
  flex: 0 0 250px;
`;

export function LeftSection() {
  const [activePanel, setActivePanel] = useState(1);

  const checkActive = (index) => (activePanel === index ? "active" : "");

  return (
    <LeftContainer id="left-panel" data-panel-side="left">
      <PanelList className="panel-list">
        <div className={checkActive(1)} onClick={() => setActivePanel(1)}>
          <ElementsIcon />
        </div>
        <div className={checkActive(2)} onClick={() => setActivePanel(2)}>
          <LayoutsIcon />
        </div>
        <div className={checkActive(3)} onClick={() => setActivePanel(3)}>
          <PagesIcon />
        </div>
        <div className={checkActive(4)} onClick={() => setActivePanel(4)}>
          <NavigatorIcon />
        </div>
      </PanelList>
      <Panels>
        <ElementsPanel elementList={elementList} isActive={checkActive(1)} />
        <LayoutsPanel layoutList={layoutList} isActive={checkActive(2)} />
        <PagesPanel isActive={checkActive(3)} />
        <NavigatorPanel isActive={checkActive(4)} />
      </Panels>
    </LeftContainer>
  );
}
