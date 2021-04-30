import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
import { SiteTreeContext } from "../../../../contexts/SiteTreeContext";
import { UserContext } from "../../../../contexts/UserContext";
import { useHistory } from "react-router-dom";
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

const coreStyle = `
* {
  border: 1px solid #bdc3c7;
  padding: 5px;
  margin: 2px;
}

.frame-content,
.frame-root,
body,
html {
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
`;

export function SettingsPanel({ isActive }) {
  const { pageTree, updateTitle, savePage } = useContext(PageTreeContext);
  const { siteTree } = useContext(SiteTreeContext);
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const history = useHistory();

  useEffect(() => {
    setTitle(pageTree.head.title);
  }, [pageTree]);

  const handleRemoveBorders = (e) => {
    let stylesheet = document
      .getElementById("iframe-view")
      .contentDocument.getElementById("core-stylesheet");

    if (e.target.checked) {
      stylesheet.innerHTML = "";
    } else {
      stylesheet.innerHTML = coreStyle;
    }
  };

  const handleTitle = (e) => {
    let value = e.target.value;
    setTitle(value);
    updateTitle(value);
  };

  const exportPage = async () => {
    window.open(`http://localhost:8000/page/${pageTree._id}/export`, "_blank");
  };

  const exportSite = async () => {
    window.open(`http://localhost:8000/site/${siteTree._id}/export`, "_blank");
  };

  const deleteSite = async () => {
    try {
      await fetch(`/site/${siteTree._id}`, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });
      history.push("/user/" + user._id);
    } catch (error) {
      console.log(error);
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
      <SettingsInputText
        value={title}
        placeholder="Type name and hit enter"
        onChange={handleTitle}
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
      <PanelButton id="saveProps" onClick={deleteSite}>
        Delete Site
      </PanelButton>
    </Panel>
  );
}
