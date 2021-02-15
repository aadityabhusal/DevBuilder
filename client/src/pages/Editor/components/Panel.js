import styled from "styled-components";

export const Panel = styled.div`
  overflow-y: auto;
  display: none;
  flex-direction: column;
  padding: 5px 10px;

  &.active {
    display: flex;
  }
`;

export const PanelList = styled.div`
  display: flex;
  border-bottom: 1px solid #bdc3c7;

  & div {
    border-left: 1px solid #bdc3c7;
    text-align: center;
    flex: 1;
    cursor: pointer;
    padding: 5px 0;

    &:hover,
    &.active {
      background-color: #ecf0f1;
      & > svg {
        fill: #3498db;
      }
    }
  }
`;

export const Panels = styled.div`
  overflow: hidden;
`;

export const PanelTitle = styled.div`
  font-size: 16px;
  text-align: center;
  padding: 5px;
  margin-bottom: 20px;
  font-weight: 500;
  border-bottom: 1px solid #bdc3c7;
`;
