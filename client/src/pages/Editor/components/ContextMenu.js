import React, { useContext } from "react";
import {
  StyledContextMenu,
  StyledContextMenuItem,
} from "../../../components/editor/ContextMenu";
import { SelectedElementContext } from "../../../contexts/SelectedElementContext";
import { nanoid } from "nanoid";

function ContextMenu({}, ref) {
  const { selectedElement, insertPasteElement } = useContext(
    SelectedElementContext
  );

  async function handleCopy(e) {
    await navigator.clipboard.writeText(JSON.stringify(selectedElement));
  }

  function updateChildrenIds(element, _id = nanoid()) {
    element._id = _id;
    element.children_order.forEach((elem, i) => {
      let new_id = nanoid();
      element.children_order[i] = new_id;
      element.children[new_id] = updateChildrenIds(
        element.children[elem],
        new_id
      );
      delete element.children[elem];
    });
    return element;
  }

  async function handlePaste(e) {
    let pasteData = await navigator.clipboard.readText();
    if (checkPasteData(pasteData)) {
      pasteData = JSON.parse(pasteData);
      pasteData = updateChildrenIds(pasteData);
      console.log(pasteData);
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
