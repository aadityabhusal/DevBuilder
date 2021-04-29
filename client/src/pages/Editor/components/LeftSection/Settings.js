import React, { useContext } from "react";
import { SiteTreeContext } from "../../../../contexts/SiteTreeContext";
import {
  Panel,
  PanelTitle,
  PanelLabel,
  PanelInputCheck,
  PanelButton,
} from "../Panel";

export function SettingsPanel({ isActive }) {
  const { saveSite } = useContext(SiteTreeContext);

  const handleRemoveBorders = (e) => {
    let stylesheet = document
      .getElementById("iframe-view")
      .contentDocument.getElementById("core-stylesheet");

    if (e.target.checked) {
      stylesheet.innerHTML = "*{border:none}";
    } else {
      stylesheet.innerHTML = "*{border: 1px solid #bdc3c7;}";
    }
  };

  return (
    <Panel className={isActive}>
      <PanelTitle>Settings</PanelTitle>
      <PanelLabel>
        <span>Remove Borders from elements</span>
        <PanelInputCheck
          type="checkbox"
          onChange={handleRemoveBorders}
        ></PanelInputCheck>
      </PanelLabel>
      <PanelButton id="saveProps" onClick={saveSite}>
        Save Site
      </PanelButton>
    </Panel>
  );
}
