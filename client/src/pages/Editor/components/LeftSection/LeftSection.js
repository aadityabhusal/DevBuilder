import React, { useEffect, useRef, useState } from "react";
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

import elementList from "./elements.json";
import layoutList from "./layouts.json";

const LeftContainer = styled.div`
  border-right: 1px solid #bdc3c7;
  flex: 0 0 450px;
  position: relative;
  padding-right: 10px;

  &:after {
    content: " ";
    background-color: #444;
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 100%;
    cursor: w-resize;
  }
`;

export function LeftSection() {
  const [activePanel, setActivePanel] = useState(1);
  const dragRef = useRef();
  let mousePostion;

  const checkActive = (index) => (activePanel === index ? "active" : "");

  document.addEventListener("mouseup", (e) => {
    document.removeEventListener("mousemove", resizeLeftSection);
  });

  const handleResize = (e) => {
    mousePostion = e.pageX;
    document.addEventListener("mousemove", resizeLeftSection);
  };

  const resizeLeftSection = (e) => {
    if (e.target.clientWidth > 400) {
      const leftX = mousePostion - e.pageX;
      mousePostion = e.pageX;
      dragRef.current.style.flex = `0 0 ${e.target.clientWidth - leftX}px`;
      let editor = document.getElementsByClassName("monaco-editor")[0];
      editor.style.width = `${editor.clientWidth - leftX}px`;
    } else {
      dragRef.current.style.flex = `0 0 401px`;
    }
  };

  return (
    <LeftContainer
      id="left-panel"
      data-panel-side="left"
      ref={dragRef}
      onMouseDown={handleResize}
    >
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
}
