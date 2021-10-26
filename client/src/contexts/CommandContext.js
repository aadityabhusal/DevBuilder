import React, { createContext, useState } from "react";

export const CommandContext = createContext();

export const CommandProvider = (props) => {
  const [history, setHistory] = useState({ current: -1, commands: [] });

  /* 
  - Undo and redo cannot place the element in the same position of the children list of the parent element instead place the element at the end.

  - The children_order list is not updated here; The command might also need to store the ordering of the list or the position of the element removed'
*/

  const addCommand = (command) => {
    if (history.current < history.commands.length - 1) {
      history.commands.length = history.current + 1;
    }
    history.current = history.commands.length;
    history.commands.push(command);
    console.log(history);
  };

  const undo = () => {
    if (history.current >= 0) {
      let cmd = history.commands[history.current];

      if (cmd.action === "drag") {
        cmd.parent.children_order.splice(cmd.index, 0, cmd.element._id);
        cmd.parent.children[cmd.element._id] = cmd.element;
      }

      if (cmd.action === "drop") {
        cmd.parent.children_order.splice(cmd.index, 1);
        delete cmd.parent.children[cmd.element._id];
      }

      let update = { ...history };
      update.current =
        update.current >= 0 ? update.current - 1 : update.current;
      console.log(update);
      setHistory((prev) => update);
    }
  };

  const redo = () => {
    if (history.current < history.commands.length - 1) {
      let cmd = history.commands[history.current + 1];
      if (cmd.action === "drag") {
        cmd.parent.children_order.splice(cmd.index, 1);
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
      console.log(update);
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
      console.log("undo");
      undo();
      return;
    }
    if (e.ctrlKey && e.key === "y") {
      e.preventDefault();
      console.log("redo");
      redo();
      return;
    }
  }); */
