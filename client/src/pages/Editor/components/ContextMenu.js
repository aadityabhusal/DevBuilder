import React, { useContext } from "react";
import styled from "styled-components";
import { SelectedElementContext } from "../../../contexts/SelectedElementContext";

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

/* 
  - When Copying section, the same ids of the elements get used again. So, when the elements are hovered in Navigator section the previous item is highlighted
  - The above issue could cause problems if querySelector(data._id) will be used to make changes to the element
*/

function ContextMenu({}, ref) {
  const { selectedElement, insertPasteElement } = useContext(
    SelectedElementContext
  );

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
    }
  }

  return (
    <StyledContextMenu ref={ref}>
      <StyledContextMenuItem onClick={handleCopy}>Copy</StyledContextMenuItem>
      <StyledContextMenuItem onClick={handlePaste}>Paste</StyledContextMenuItem>
    </StyledContextMenu>
  );
}

export const ContextMenuFR = React.forwardRef(ContextMenu);

function checkPasteData(pasteData) {
  try {
    let data = JSON.parse(pasteData);
    if (data._id && data.tagName && data.path.length) {
      return true;
    } else {
      throw new Error();
    }
  } catch (e) {
    return false;
  }
}
