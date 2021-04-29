import React, { useContext } from "react";
import styled from "styled-components";
import { SelectedElementContext } from "../../../contexts/SelectedElementContext";
import { SiteTreeContext } from "../../../contexts/SiteTreeContext";

const StyledContextMenuItem = styled.li`
  padding: 5px 15px;
  border: none;
  margin: 0;
  border-bottom: 1px solid #bdc3c7;
  background: #fff;
  cursor: pointer;
  &:hover {
    background: #ecf0f1;
  }

  &:last-child {
    border-bottom: 0;
  }
`;

const StyledContextMenu = styled.ul`
  display: none;
  flex-direction: column;
  list-style: none;
  overflow: hidden;
  margin: 0;
  padding: 0;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  position: absolute;
`;

function ContextMenu({}, ref) {
  const { selectedElement, insertPasteElement } = useContext(
    SelectedElementContext
  );
  const { updateTree } = useContext(SiteTreeContext);

  /*   function handleMoveUp(e) {
    console.log(selectedElement);
  }
  function handleMoveDown(e) {
    console.log(selectedElement);
  } */
  async function handleCopy(e) {
    await navigator.clipboard.writeText(JSON.stringify(selectedElement));
  }
  async function handlePaste(e) {
    let pasteData = await navigator.clipboard.readText();
    if (checkPasteData(pasteData)) {
      pasteData = JSON.parse(pasteData);
      pasteData._id = performance.now().toString(36).replace(/\./g, "");
      pasteData.path = [...selectedElement.path, selectedElement._id];
      insertPasteElement(pasteData);
      updateTree(pasteData);
    }
  }
  function handleDelete(e) {
    console.log(selectedElement);
  }

  return (
    <StyledContextMenu ref={ref}>
      {/* <StyledContextMenuItem onClick={handleMoveUp}>
        Move Up
      </StyledContextMenuItem>
      <StyledContextMenuItem onClick={handleMoveDown}>
        Move Down
      </StyledContextMenuItem> */}
      <StyledContextMenuItem onClick={handleCopy}>Copy</StyledContextMenuItem>
      <StyledContextMenuItem onClick={handlePaste}>Paste</StyledContextMenuItem>
      <StyledContextMenuItem onClick={handleDelete}>
        Delete
      </StyledContextMenuItem>
    </StyledContextMenu>
  );
}

export const ContextMenuFR = React.forwardRef(ContextMenu);

function checkPasteData(pasteData) {
  try {
    JSON.parse(pasteData);
    return true;
  } catch (e) {
    return false;
  }
}
