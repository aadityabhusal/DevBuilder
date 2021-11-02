import React, { createContext, useState } from "react";
import { updateStyle } from "../utils";

export const CommandContext = createContext();

export const CommandProvider = (props) => {
  const [history, setHistory] = useState({ current: -1, commands: [] });

  const addCommand = (command) => {
    let update = { ...history };
    if (update.current < update.commands.length - 1) {
      update.commands.length = update.current + 1;
    }
    update.current = update.commands.length;
    update.commands.push(command);
    setHistory((prev) => update);
  };

  const undo = () => {
    if (history.current >= 0) {
      let update = { ...history };

      let cmd = update.commands[update.current];

      if (cmd.action === "moveElement") {
        // Problem: sometimes deep nested element moves causes an element to stay within the current parent eventhough the children array and objects are updated
        cmd.parent.children_order.splice(cmd.index, 1);
        delete cmd.parent.children[cmd.element._id];

        if (cmd.prevParent && cmd.prevIndex !== -1) {
          cmd.prevParent.children_order.splice(
            cmd.prevIndex,
            0,
            cmd.element._id
          );
          cmd.prevParent.children[cmd.element._id] = cmd.element;
        }
      }

      if (cmd.action === "styleChange") {
        let prevStyle = JSON.parse(cmd.prevStyle);
        cmd.style.styles = prevStyle;
        updateStyle(cmd.style.name, cmd.style.styles);
      }

      update.current =
        update.current >= 0 ? update.current - 1 : update.current;
      setHistory((prev) => update);
    }
  };

  const redo = () => {
    if (history.current < history.commands.length - 1) {
      let cmd = history.commands[history.current + 1];
      if (cmd.action === "moveElement") {
        if (cmd.prevParent && cmd.prevIndex !== false) {
          cmd.prevParent.children_order.splice(cmd.prevIndex, 1);
          delete cmd.prevParent.children[cmd.element._id];
        }
        cmd.parent.children_order.splice(cmd.index, 0, cmd.element._id);
        cmd.parent.children[cmd.element._id] = cmd.element;
      }

      if (cmd.action === "styleChange") {
        let prevStyle = JSON.parse(cmd.prevStyle);
        cmd.style.styles = prevStyle;
        updateStyle(cmd.style.name, cmd.style.styles);
      }

      let update = { ...history };
      update.current =
        update.current < update.commands.length - 1
          ? update.current + 1
          : update.current;
      setHistory((prev) => update);
    }
  };

  return (
    <CommandContext.Provider value={{ history, addCommand, undo, redo }}>
      {props.children}
    </CommandContext.Provider>
  );
};

/*   document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "z") {
      e.preventDefault();
      undo();
      return;
    }
    if (e.ctrlKey && e.key === "y") {
      e.preventDefault();
      redo();
      return;
    }
  }); */
