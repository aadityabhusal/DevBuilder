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

export const PanelItems = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  & > * {
    flex: 0 0 ${(props) => (props.cols === 2 ? 45 : 100)}%;
  }
`;

export const PanelItem = styled.div`
  font-size: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
`;

export const PanelButton = styled(PanelItem).attrs({ as: "button" })`
  outline: 0;
`;

export const PanelInputText = styled(PanelItem).attrs({ as: "input" })`
  flex: 0 1 40%;
  outline: 0;
  cursor: text;
  text-align: left;
  padding-left: 10px;
`;

export const PanelTextArea = styled(PanelInputText).attrs({ as: "textarea" })`
  flex: 1;
  resize: vertical;
`;

export const PanelLabel = styled.div`
  font-size: 12px;
  margin-bottom: 10px;
  margin-left: 5px;
`;
