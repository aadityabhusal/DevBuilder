import React, { createContext, useContext, useState } from "react";
import { updateStyle } from "../utils";
import { PageTreeContext } from "./PageTreeContext";

export const CommandContext = createContext();

export const CommandProvider = (props) => {
  const [history, setHistory] = useState({ current: -1, commands: [] });
  const { moveElement } = useContext(PageTreeContext);

  const addCommand = (command) => {
    // Mutating the state here
    if (history.current < history.commands.length - 1) {
      history.commands.length = history.current + 1;
    }
    history.current = history.commands.length;
    history.commands.push(command);
  };

  const undo = () => {
    if (history.current >= 0) {
      let update = { ...history };
      let cmd = update.commands[update.current];

      if (cmd.action === "moveElement") {
        moveElement(cmd.element, cmd.target, cmd.parent, cmd.to, cmd.from);
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
        moveElement(cmd.element, cmd.parent, cmd.target, cmd.from, cmd.to);
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
