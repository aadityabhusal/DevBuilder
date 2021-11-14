import React, { createContext, useContext, useEffect, useState } from "react";
import { PageTreeContext } from "./PageTreeContext";

export const CommandContext = createContext();

export const CommandProvider = (props) => {
  const [history, setHistory] = useState({ current: -1, commands: [] });
  const { moveElement, styleBlockChange, moveStyleBlock, changeProperty } =
    useContext(PageTreeContext);

  function addCommand(command) {
    let update = { ...history };
    if (update.current < update.commands.length - 1) {
      update.commands.length = update.current + 1;
    }
    update.current = update.commands.length;
    update.commands.push(command);
    setHistory((prev) => update);
  }

  function undo() {
    if (history.current >= 0) {
      let update = { ...history };
      let cmd = update.commands[update.current];

      if (cmd.action === "moveElement") {
        moveElement(cmd.element, cmd.target, cmd.parent, cmd.to, cmd.from);
      }

      if (cmd.action === "changeProperty") {
        changeProperty(cmd.prev);
      }

      if (cmd.action === "styleChange") {
        styleBlockChange(cmd.styleName, cmd.blockId, cmd.prevStyle);
      }

      if (cmd.action === "moveStyleBlock") {
        moveStyleBlock(cmd.styleName, cmd.styleBlock, cmd.to, cmd.from);
      }

      update.current =
        update.current >= 0 ? update.current - 1 : update.current;
      setHistory((prev) => update);
    }
  }

  function redo() {
    if (history.current < history.commands.length - 1) {
      let cmd = history.commands[history.current + 1];
      if (cmd.action === "moveElement") {
        moveElement(cmd.element, cmd.parent, cmd.target, cmd.from, cmd.to);
      }

      if (cmd.action === "changeProperty") {
        changeProperty(cmd.element);
      }

      if (cmd.action === "styleChange") {
        styleBlockChange(cmd.styleName, cmd.blockId, cmd.style);
      }

      if (cmd.action === "moveStyleBlock") {
        moveStyleBlock(cmd.styleName, cmd.styleBlock, cmd.from, cmd.to);
      }

      let update = { ...history };
      update.current =
        update.current < update.commands.length - 1
          ? update.current + 1
          : update.current;
      setHistory((prev) => update);
    }
  }

  function deleteStyleCommands(styleName) {
    let update = { ...history };

    let commands = update.commands.filter(
      (item) => item.styleName !== styleName
    );
    let length = update.commands.length;
    let current = update.current - (length - commands.length);

    setHistory((prev) => ({ current, commands }));
  }

  /*   useEffect(() => {
    function executeKeyEvents(e) {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo();
      }
    }
    console.log("Hello");
    document.addEventListener("keydown", executeKeyEvents);
    return () => {
      console.log("Hello");
      document.removeEventListener("keydown", executeKeyEvents);
    };
  }, [history.current]); */

  return (
    <CommandContext.Provider
      value={{ history, addCommand, undo, redo, deleteStyleCommands }}
    >
      {props.children}
    </CommandContext.Provider>
  );
};
