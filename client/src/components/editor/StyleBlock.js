import styled from "styled-components";

export const PasteButton = styled.div`
  margin-right: 10px;
  cursor: pointer;
  position: absolute;
  top: -30px;
  right: 20px;

  & > svg {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
`;

export const CopyButton = styled(PasteButton)`
  right: 50px;
`;

export const CloseButton = styled.div`
  cursor: pointer;
  border: 1px solid #bdc3c7;
  border-left: none;
  border-top: none;
  align-self: stretch;
  & > svg {
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
`;

export const StyleInput = styled.input`
  padding: 5px;
  border: 1px solid #bdc3c7;
  outline: none;
  border-radius: 0;
  width: 170px;
  border-top: none;

  &.value-input {
    border-left: none;
    flex: 1;
  }
`;

export const StyleList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  position: relative;
`;

export const StyleListItem = styled.li`
  display: flex;
  align-items: center;
`;
