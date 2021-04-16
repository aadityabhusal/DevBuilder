import React from "react";
import styled from "styled-components";

const StyledContextMenuItem = styled.li`
  padding: 5px 15px;
  border: none;
  margin: 0;
  border-bottom: 1px solid #bdc3c7;
  background: #fff;
  cursor: pointer;
  &:hover {
    background: #ecf0f1;
  }

  &:last-child {
    border-bottom: 0;
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

function ContextMenu({}, ref) {
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

const contextMenuList = ["Move Up", "Move Down", "Delete"];
