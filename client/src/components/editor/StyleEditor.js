import styled from "styled-components";

export const StyleContainer = styled.div`
  flex: 1;
  height: calc(100% - 200px);
  padding-top: 15px;
  display: flex;
  flex-direction: column;
`;

export const StyleBlockList = styled.div`
  flex: 1;
  overflow-y: auto;
  border-bottom: 1px solid #bdc3c7;
`;

export const AddNewStyle = styled.button`
  padding: 10px 15px;
  margin: 10px;
  border: 1px solid #bdc3c7;
  cursor: pointer;
  align-self: flex-end;
  font-weight: bold;
  background-color: #34495e;
  color: #eee;
`;

/*  */

export const BlockContainer = styled.div`
  border-bottom: 1px solid #bdc3c7;
  padding: 10px;

  &.selected-block {
    background-color: #ecf0f1;
  }
`;

export const StyleHead = styled.div`
  display: flex;
  border-bottom: 1px solid #bdc3c7;
`;

export const CloseButton = styled.div`
  cursor: pointer;
`;

export const StyleInput = styled.input`
  padding: 5px;
  border: 1px solid #bdc3c7;
  border-bottom: none;
  outline: none;
  border-radius: 0;
  width: 160px;
  margin-right: auto;
`;

export const PropertiesDataList = styled.datalist``;
