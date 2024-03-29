import styled from "styled-components";

export const Panel = styled.div`
  position: relative;
  display: none;
  overflow-y: auto;
  flex-direction: column;
  padding: 5px 10px;
  height: calc(100vh - 50px);

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

export const Panels = styled.div``;

export const PanelTitle = styled.div`
  font-size: 16px;
  text-align: center;
  padding: 5px;
  margin-bottom: 20px;
  font-weight: 500;
  border-bottom: 1px solid #bdc3c7;
`;

export const PanelItems = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  & > * {
    flex: 0 0 ${(props) => (props.cols === 2 ? 45 : 100)}%;
  }
`;

export const PanelItem = styled.div`
  font-size: 14px;
  border: 1px solid #bdc3c7;
  margin-bottom: 15px;
  text-align: center;
  padding: 10px 0;
  cursor: all-scroll;
  transition: 0.2s all;

  &:hover {
    box-shadow: 0 3px 4px 0 rgb(0 0 0 / 15%);
  }
`;

export const PanelButton = styled(PanelItem).attrs({ as: "button" })`
  cursor: pointer;
  font-weight: 600;
  color: #2c3e50;
  background: #f5f6fa;
  border-color: #95a5a6;
`;

export const PanelInputText = styled.input`
  font-size: 14px;
  outline: 0;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  background: #f5f6fa;
  border-bottom: 2px solid #95a5a6;
`;

export const PanelInputCheck = styled.input``;

export const PanelTextArea = styled(PanelInputText).attrs({ as: "textarea" })`
  resize: vertical;
  min-height: 110px;
`;

export const PanelLabel = styled.label`
  font-size: 14px;
  margin-bottom: 10px;
  margin-left: 5px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #95a5a6;
`;

export const SectionMask = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
  display: none;
`;
