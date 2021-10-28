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
import {
  DialogAction,
  DialogBox,
  DialogHead,
  DialogOverlay,
  DialogText,
} from "../DialogBox";
import { CommandContext } from "../../../../contexts/CommandContext";

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
  const [dialogBox, setDialogBox] = useState(false);
  const { pageTree, updateTitle, savePage } = useContext(PageTreeContext);
  const { siteTree } = useContext(SiteTreeContext);
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const history = useHistory();

  const { undo, redo } = useContext(CommandContext);

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
    } catch (error) {}
  };

  return (
    <Panel className={isActive}>
      {dialogBox && (
        <DialogOverlay>
          <DialogBox>
            <DialogHead>
              <svg height="16px" viewBox="0 0 20 20" width="24px" fill="#000">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
              Delete Site
            </DialogHead>
            <DialogText>Are you sure you want to delete the site?</DialogText>
            <DialogAction>
              <PanelButton style={{ color: "#c0392b" }} onClick={deleteSite}>
                Delete
              </PanelButton>
              <PanelButton onClick={(e) => setDialogBox(false)}>
                Cancel
              </PanelButton>
            </DialogAction>
          </DialogBox>
        </DialogOverlay>
      )}
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
      <PanelButton
        style={{ background: "#e74c3c", color: "#ecf0f1" }}
        id="saveProps"
        onClick={(e) => setDialogBox(true)}
      >
        Delete Site
      </PanelButton>
      <div style={{ marginTop: "50px" }}></div>
      <PanelButton id="saveProps" onClick={undo}>
        Undo Action
      </PanelButton>
      <PanelButton id="saveProps" onClick={redo}>
        Redo Action
      </PanelButton>
    </Panel>
  );
}
