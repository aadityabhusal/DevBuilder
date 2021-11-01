import styled from "styled-components";

export const StyledContextMenuItem = styled.li`
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

export const StyledContextMenu = styled.ul`
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
