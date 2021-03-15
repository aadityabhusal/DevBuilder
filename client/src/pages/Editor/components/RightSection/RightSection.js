import React, { useState } from "react";
import styled from "styled-components";
import {
  PropertiesIcon,
  ScriptsIcon,
  SettingsIcon,
  StylesIcon,
} from "../Icons";

import { PanelList, Panels } from "../Panel";
import { PropertiesPanel } from "./Properties";
import { ScriptsPanel } from "./Scripts";
import { SettingsPanel } from "./Settings";
import { StylesPanel } from "./Styles";

const RightContainer = styled.div`
  border-left: 1px solid #bdc3c7;
  width: 250px;
`;
export function RightSection({ target, editTarget }) {
  const [activePanel, setActivePanel] = useState(1);

  const checkActive = (index) => (activePanel === index ? "active" : "");

  return (
    <RightContainer>
      <PanelList>
        <div className={checkActive(1)} onClick={() => setActivePanel(1)}>
          <PropertiesIcon />
        </div>
        <div className={checkActive(2)} onClick={() => setActivePanel(2)}>
          <StylesIcon />
        </div>
        <div className={checkActive(3)} onClick={() => setActivePanel(3)}>
          <ScriptsIcon />
        </div>
        <div className={checkActive(4)} onClick={() => setActivePanel(4)}>
          <SettingsIcon />
        </div>
      </PanelList>
      <Panels>
        <PropertiesPanel
          target={target}
          editTarget={editTarget}
          isActive={checkActive(1)}
        />
        <StylesPanel target={target} isActive={checkActive(2)} />
        <ScriptsPanel target={target} isActive={checkActive(3)} />
        <SettingsPanel target={target} isActive={checkActive(4)} />
      </Panels>
    </RightContainer>
  );
}
