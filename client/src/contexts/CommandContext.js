import React, { createContext, useState } from "react";

export const CommandContext = createContext();

export const CommandProvider = (props) => {
  const [history, setHistory] = useState({ current: -1, commands: [] });

  const addCommand = (command) => {
    if (history.current < history.commands.length - 1) {
      history.commands.length = history.current + 1;
    }
    history.current = history.commands.length;
    history.commands.push(command);
  };

  const undo = () => {
    if (history.current >= 0) {
      let cmd = history.commands[history.current];

      if (cmd.action === "drag") {
        cmd.parent.children_order.splice(cmd.index, 0, cmd.element._id);
        cmd.parent.children[cmd.element._id] = cmd.element;
      }

      if (cmd.action === "drop") {
        let index = cmd.parent.children_order.indexOf(cmd.element._id);
        cmd.parent.children_order.splice(index, 1);
        delete cmd.parent.children[cmd.element._id];
      }

      let update = { ...history };
      update.current =
        update.current >= 0 ? update.current - 1 : update.current;
      setHistory((prev) => update);
    }
  };

  const redo = () => {
    if (history.current < history.commands.length - 1) {
      let cmd = history.commands[history.current + 1];

      if (cmd.action === "drag") {
        let index = cmd.parent.children_order.indexOf(cmd.element._id);
        cmd.parent.children_order.splice(index, 1);
        delete cmd.parent.children[cmd.element._id];
      }

      if (cmd.action === "drop") {
        cmd.parent.children_order.splice(cmd.index, 0, cmd.element._id);
        cmd.parent.children[cmd.element._id] = cmd.element;
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
