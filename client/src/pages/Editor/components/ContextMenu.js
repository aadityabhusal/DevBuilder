import React, { useContext } from "react";
import {
  StyledContextMenu,
  StyledContextMenuItem,
} from "../../../components/editor/ContextMenu";
import { SelectedElementContext } from "../../../contexts/SelectedElementContext";
import { nanoid } from "nanoid";
import { PageTreeContext } from "../../../contexts/PageTreeContext";
import { CommandContext } from "../../../contexts/CommandContext";

function ContextMenu({}, ref) {
  const { selectedElement } = useContext(SelectedElementContext);
  const { addCommand } = useContext(CommandContext);
  const { moveElement } = useContext(PageTreeContext);

  async function handleCopy(e) {
    ref.current.style.display = "none";
    try {
      await navigator.clipboard.writeText(JSON.stringify(selectedElement));
    } catch (error) {}
  }

  function updateChildrenIds(element, _id = nanoid()) {
    element._id = _id;
    element.children_order &&
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

  async function handlePaste(e, duplicateTo = null) {
    let pasteData = await navigator.clipboard.readText();
    pasteData = checkPasteData(pasteData);
    if (pasteData) {
      pasteData = updateChildrenIds(pasteData.element);
      let targetPath = selectedElement.element.path.concat(
        selectedElement.element._id
      );
      let to = selectedElement.element.children_order.length;
      ref.current.style.display = "none";

      if (duplicateTo) {
        to = duplicateTo;
        targetPath.pop();
      }

      addCommand({
        action: "moveElement",
        element: pasteData,
        parent: [],
        target: targetPath,
        from: null,
        to,
      });

      moveElement(pasteData, [], targetPath, null, to);
    }
  }

  async function handleDuplicate() {
    try {
      handleCopy();
      let to = selectedElement.from + 1;
      handlePaste({}, to);
    } catch (error) {}
  }

  function handleDelete() {
    ref.current.style.display = "none";
    addCommand({
      action: "moveElement",
      element: selectedElement.element,
      parent: selectedElement.element.path,
      target: [],
      from: selectedElement.from,
      to: null,
    });

    moveElement(
      selectedElement.element,
      selectedElement.element.path,
      [],
      selectedElement.from,
      null
    );
  }

  return (
    <StyledContextMenu ref={ref}>
      <StyledContextMenuItem onClick={handleCopy}>Copy</StyledContextMenuItem>
      <StyledContextMenuItem onClick={handlePaste}>Paste</StyledContextMenuItem>
      <StyledContextMenuItem onClick={handleDuplicate}>
        Duplicate
      </StyledContextMenuItem>
      <StyledContextMenuItem onClick={handleDelete}>
        Delete
      </StyledContextMenuItem>
    </StyledContextMenu>
  );
}

export const ContextMenuFR = React.forwardRef(ContextMenu);

function checkPasteData(pasteData) {
  try {
    let { element, from } = JSON.parse(pasteData);
    if (element._id && element.tagName && element.path.length) {
      return { element, from };
    }
    throw new Error();
  } catch (e) {
    return false;
  }
}
