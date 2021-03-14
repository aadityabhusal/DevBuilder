import React from "react";
import styled from "styled-components";

const StyledContextMenuItem = styled.li`
  padding: 5px 15px;
  border-bottom: 1px solid #bdc3c7;
  background: #fff;
  cursor: pointer;
  &:hover {
    background: #ecf0f1;
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

function ContextMenu(props, ref) {
  // const contextRef = useRef();
  // useEffect(() => {
  //   let menu = contextRef.current;
  //   window.addEventListener("contextmenu", function (e) {
  //     e.preventDefault();
  //     menu.style.display = "flex";
  //     menu.style.top = e.clientY;
  //     menu.style.left = e.clientX;
  //     console.log(e.clientY, e.clientY);
  //     return false;
  //   });
  // }, [contextRef]);
  return (
    <StyledContextMenu ref={ref}>
      {contextMenuList.map((item, i) => {
        return <ContextMenuItem name={item} key={i} />;
      })}
    </StyledContextMenu>
  );
}

export const ContextMenuFR = React.forwardRef(ContextMenu);

function ContextMenuItem({ name }) {
  return <StyledContextMenuItem>{name}</StyledContextMenuItem>;
}

const contextMenuList = ["Delete", "Edit", "Move Up", "Move Down"];
