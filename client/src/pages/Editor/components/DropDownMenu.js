import styled from "styled-components";
import { PanelButton } from "./Panel";

export const DropDownMenu = styled.div`
  position: relative;
  border-bottom: 2px solid #95a5a6;
  display: flex;
  justify-content: space-between;
`;

export const DropDownButton = styled.div`
  padding: 8px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  cursor: pointer;
  border: 1px solid #95a5a6;
  border-bottom: 0;
  border-top: 0;
`;

export const AddNewButton = styled(PanelButton)`
  padding-left: 10px;
  padding-right: 10px;
  border: none;
  margin: 0;
  outline: 0;
`;

export const ItemName = styled.div`
  font-weight: 600;
`;

export const DropDownList = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  z-index: 1;
  background-color: #fff;
  width: 100%;
  top: 41px;
  border-bottom: 2px solid #95a5a6;
`;

export const DropDownListItem = styled(DropDownButton)`
  border-top: 1px solid #95a5a6;
`;

export const AddItemBox = styled(DropDownList)`
  & input {
    margin: 0;
    border: 0;
    border-top: 1px solid #95a5a6;
  }
`;

export const CloseButton = styled.div`
  z-index: 2;
`;
