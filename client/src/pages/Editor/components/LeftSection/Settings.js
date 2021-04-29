import React, { useContext } from "react";
import styled from "styled-components";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
import { SiteTreeContext } from "../../../../contexts/SiteTreeContext";
import { getBodyHTML, getHeadHTML } from "../../getPageHTML";
import {
  Panel,
  PanelTitle,
  PanelLabel,
  PanelInputCheck,
  PanelButton,
  PanelInputText,
} from "../Panel";

const SettingsInputText = styled(PanelInputText)`
  margin-top: 10px;
`;

export function SettingsPanel({ isActive }) {
  const { pageTree, updateTitle, savePage } = useContext(PageTreeContext);
  const { siteTree } = useContext(SiteTreeContext);

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

  const handleTitle = (e) => {
    let value = e.target.value;
    updateTitle(value);
  };

  const exportPage = async () => {
    window.open(`http://localhost:8000/page/${pageTree._id}/export`, "_blank");
  };

  const exportSite = async () => {
    window.open(`http://localhost:8000/site/${siteTree._id}/export`, "_blank");
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
      <SettingsInputText
        defaultValue={pageTree.head.title}
        placeholder="Type name and hit enter"
        onKeyUp={handleTitle}
      />
      <PanelButton id="saveProps" onClick={savePage}>
        Save Page
      </PanelButton>
      <PanelButton id="saveProps" onClick={exportPage}>
        Export Page
      </PanelButton>
      <PanelButton id="saveProps" onClick={exportSite}>
        Export Site
      </PanelButton>
    </Panel>
  );
}
