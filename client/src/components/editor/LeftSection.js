import styled from "styled-components";
import { Panel, PanelInputText, PanelItem } from "./Panel";

export const LeftContainer = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-right: 1px solid #bdc3c7;
  flex: 0 0 400px;
  position: relative;
`;

export const StylePanel = styled(Panel)`
  overflow: initial;
  padding: 0;
  height: calc(100vh - 85px);
`;

export const SettingsInputText = styled(PanelInputText)`
  margin-top: 10px;
`;

export const NavigatorContainer = styled.div`
  border: 1px solid #bdc3c7;
  flex: 1;
  :last-child {
    border-top: 1px solid #bdc3c7;
  }
`;

// Page Panel

export const PageList = styled.div`
  max-height: 200px;
  overflow: auto;
`;

export const PageInputText = styled(PanelInputText)`
  flex: 0 1 100%;
  margin-top: 10px;
`;

export const PageItem = styled(PanelItem)`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DeletePage = styled.div``;

// Page Panel

export const ElementsPanelItem = styled(PanelItem)`
  font-size: 16px;
  font-weight: 500;
  padding: 0;

  & > #elementTag {
    font-size: 18px;
    background: #ecf0f1;
    padding: 10px;
  }

  & > #elementName {
    border-top: 1px solid #bdc3c7;
    font-size: 14px;
    padding: 5px;
  }
`;

// Navigator Panel

export const NavigatorListContainer = styled.div`
  background-color: #fff;
`;

export const DropDownArrow = styled.div`
  align-self: stretch;
  cursor: pointer;
  ${({ isDropped }) => !isDropped && `transform: rotate(-90deg);`}

  svg {
    fill: #7f8c8d;
    height: 20px;
    width: 20px;
    vertical-align: middle;
  }

  :hover svg {
    fill: #000;
  }
`;

export const NavigatorListItem = styled.div`
  border-bottom: 1px solid #bdc3c7;
  font-size: 14px;
  display: flex;
  :hover {
    background-color: #ecf0f1;
  }
`;

export const NavigatorItemName = styled.div`
  padding-left: 5px;
  background-color: inherit;
`;

export const VerticalLines = styled.div`
  margin-left: 10px;
  border: none;
  border-left: 1px solid #bdc3c7;
`;

// Navigator Panel
