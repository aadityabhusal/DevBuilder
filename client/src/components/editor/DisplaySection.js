import styled from "styled-components";

export const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

// View Section
export const OutlineBox = styled.div`
  position: absolute;
  display: none;
  align-items: flex-start;
  z-index: 100;
  pointer-events: none;
  user-select: none;

  & > span {
    background-color: #3498db;
    margin-top: -20px;
    margin-left: -1px;
    color: #fff;
    padding: 2px 5px;
    font-size: 12px;
  }
`;

export const AfterElementLine = styled.div`
  border-color: #2ecc71;
  position: absolute;
  display: none;
  z-index: 100;
  pointer-events: none;
  user-select: none;
`;

export const TopBar = styled.div`
  height: 25px;
  padding: 5px 10px;
  border-bottom: 1px solid #bdc3c7;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #415b75;

  a {
    font-size: 14px;
    color: #ffffff;
    text-decoration: none;
    margin-right: auto;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    padding: 4px 8px;
    margin: 0;
    margin-left: 10px;
    background-color: #193a54;
    border-color: #193a54;
    color: #fff;

    &:hover {
      box-shadow: 0 4px 6px 0 #34495e;
    }
  }
`;
