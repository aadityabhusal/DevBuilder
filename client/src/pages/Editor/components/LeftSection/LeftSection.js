import React, { useState } from "react";
import styled from "styled-components";
import {
  ElementsIcon,
  LayoutsIcon,
  PagesIcon,
  PropertiesIcon,
  SettingsIcon,
  StylesIcon,
} from "../Icons";

import { Panels, PanelList } from "../Panel";
import { ElementsPanel } from "./Elements";
import { LayoutsPanel } from "./Layouts";
import { PagesPanel } from "./Pages";
import { PropertiesPanel } from "./Properties";
import { SettingsPanel } from "./Settings";
import { StylesPanel } from "./Styles";

import elementList from "../../lists/elements.json";
import layoutList from "../../lists/layouts.json";

const LeftContainer = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-right: 1px solid #bdc3c7;
  flex: 0 0 400px;
  position: relative;
`;

export const LeftSection = React.forwardRef(({}, ref) => {
  const [activePanel, setActivePanel] = useState(1);

  const checkActive = (index) => (activePanel === index ? "active" : "");

  return (
    <LeftContainer id="left-panel" data-panel-side="left" ref={ref}>
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
          <PropertiesIcon />
        </div>
        <div className={checkActive(5)} onClick={() => setActivePanel(5)}>
          <StylesIcon />
        </div>
        <div className={checkActive(6)} onClick={() => setActivePanel(6)}>
          <SettingsIcon />
        </div>
      </PanelList>
      <Panels>
        <ElementsPanel elementList={elementList} isActive={checkActive(1)} />
        <LayoutsPanel layoutList={layoutList} isActive={checkActive(2)} />
        <PagesPanel isActive={checkActive(3)} />
        <PropertiesPanel isActive={checkActive(4)} />
        <StylesPanel isActive={checkActive(5)} />
        <SettingsPanel isActive={checkActive(6)} />
      </Panels>
    </LeftContainer>
  );
});
