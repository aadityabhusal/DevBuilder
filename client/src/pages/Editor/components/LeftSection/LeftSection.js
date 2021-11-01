import React, { useContext, useState } from "react";
import { PanelList, Panels } from "../../../../components/editor/Panel";
import { LeftContainer } from "../../../../components/editor/LeftSection";
import {
  ElementsIcon,
  LayoutsIcon,
  PagesIcon,
  PropertiesIcon,
  NavigatorIcon,
  SettingsIcon,
  StylesIcon,
} from "../../../../components/ui/Icons";

import { ElementsPanel } from "./Elements";
import { LayoutsPanel } from "./Layouts";
import { PagesPanel } from "./Pages";
import { PropertiesPanel } from "./Properties";
import { NavigatorPanel } from "./Navigator";
import { SettingsPanel } from "./Settings";
import { StylesPanel } from "./Styles";

import elementList from "../../lists/elements.json";
import layoutList from "../../lists/layouts.json";
import { SiteTreeContext } from "../../../../contexts/SiteTreeContext";

export const LeftSection = React.forwardRef(({}, ref) => {
  const [activePanel, setActivePanel] = useState(1);
  const checkActive = (index) => (activePanel === index ? "active" : "");
  const { siteTree } = useContext(SiteTreeContext);
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
          <NavigatorIcon />
        </div>
        <div className={checkActive(6)} onClick={() => setActivePanel(6)}>
          <StylesIcon />
        </div>
        <div className={checkActive(7)} onClick={() => setActivePanel(7)}>
          <SettingsIcon />
        </div>
      </PanelList>
      <Panels>
        <ElementsPanel elementList={elementList} isActive={checkActive(1)} />
        <LayoutsPanel layoutList={layoutList} isActive={checkActive(2)} />
        <PagesPanel pages={siteTree.pages} isActive={checkActive(3)} />
        <PropertiesPanel isActive={checkActive(4)} />
        <NavigatorPanel isActive={checkActive(5)} />
        <StylesPanel isActive={checkActive(6)} />
        <SettingsPanel isActive={checkActive(7)} />
      </Panels>
    </LeftContainer>
  );
});
