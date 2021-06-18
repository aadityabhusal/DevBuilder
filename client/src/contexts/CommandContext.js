import React, { createContext, useState } from "react";

export const CommandContext = createContext();

export const CommandProvider = (props) => {
  const [history, setHistory] = useState([]);
  const [current, setCurrent] = useState({ position: 1, command: {} });

  /* 
    let command = {
      action: "add/remove/move"
      element: element_object,
      from: parent_object
      to: parent_object,
    }
  */

  const addCommand = (command) => {
    history.length = current.position;
    setHistory((prev) => {
      prev.push(command);
      return prev;
    });
    setCurrent((prev) => ({
      position: history.length,
      command: history[history.length - 1],
    }));
  };

  const undo = () => {
    if (history.length >= 2) {
      setCurrent((prev) => ({
        position: prev.position - 1,
        command: history[prev.position - 2],
      }));
      execute(current.command);
    }
  };

  const redo = () => {
    if (history.length > current.position) {
      setCurrent((prev) => ({
        position: current.position + 1,
        command: history[current.position],
      }));
      execute(current.command);
    }
  };

  /* 
    Here for each case, we can use the updateTree function of PageTreeContext
    Provide the edited parent object of either from_parent or to_parent or both   
  */
  const execute = (command) => {
    switch (command.action) {
      case "add":
        break;
      case "remove":
        break;
      case "move":
        break;
      default:
        break;
    }
  };

  return (
    <CommandContext.Provider
      value={{ history, current, addCommand, undo, redo, execute }}
    >
      {props.children}
    </CommandContext.Provider>
  );
};
