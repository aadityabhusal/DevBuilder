import styled from "styled-components";

export const DisplayContainer = styled.div`
  display: flex;
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
