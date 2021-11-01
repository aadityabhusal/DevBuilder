import styled from "styled-components";

export const DialogOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const DialogBox = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid #666;
  border-radius: 5px;
`;

export const DialogHead = styled.div`
  padding: 5px;
  text-align: center;
  font-weight: bold;
`;

export const DialogText = styled.div`
  padding: 10px;
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
`;

export const DialogAction = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-end;

  & > button {
    padding: 10px;
    margin-right: 10px;
  }
`;
