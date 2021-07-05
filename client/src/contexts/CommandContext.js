import React, { createContext, useState } from "react";

export const CommandContext = createContext();

export const CommandProvider = (props) => {
  const [history, setHistory] = useState({ current: -1, commands: [] });

  /* 
  WARNING: The value of elements and parents in the commands are taken by reference

  Undo and redo cannot place the element in the same position of the children list of the parent element instead place the element at the end.
*/

  /* 
  PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM

  THE CHILDREN_ORDER LIST IS NOT UPDATED HERE
  THE COMMAND MIGHT ALSO NEED TO STORE THE ORDERING OF THE LIST OR THE POSITION OF THE ELEMENT REMOVED


*/

  const addCommand = (command) => {
    setHistory((prev) => {
      if (prev.current < prev.commands.length - 1) {
        prev.commands.length = prev.current + 1;
      }
      prev.current = prev.commands.length;
      prev.commands.push(command);
      return prev;
    });
    console.log(history);
  };

  const undo = () => {
    console.log(history);
    if (history.current >= 0) {
      let command = history.commands[history.current];

      if (command.action === "drag") {
        command.parent.children_order.splice(
          command.index,
          0,
          command.element._id
        );
        command.parent.children[command.element._id] = command.element;
      }

      if (command.action === "drop") {
        command.parent.children_order.splice(command.index, 1);
        delete command.parent.children[command.element._id];
      }

      setHistory((prev) => {
        let temp = { ...prev };
        temp.current = temp.current >= 1 ? temp.current - 1 : temp.current;
        return temp;
      });
    }
  };

  const redo = () => {
    if (history.commands.length > history.current) {
      let command = history.commands[history.current];

      if (command.action === "drag") {
        command.parent.children_order.splice(command.index, 1);
        delete command.parent.children[command.element._id];
      }

      if (command.action === "drop") {
        command.parent.children_order.splice(
          command.index,
          0,
          command.element._id
        );
        command.parent.children[command.element._id] = command.element;
      }

      setHistory((prev) => {
        let temp = { ...prev };
        temp.current =
          temp.current < temp.commands.length - 1
            ? temp.current + 1
            : temp.current;
        return temp;
      });
    }
    console.log(history);
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
