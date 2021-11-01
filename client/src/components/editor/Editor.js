import styled from "styled-components";

export const EditorContainer = styled.div`
  display: flex;
  max-height: calc(100vh - 40px);
  overflow: hidden;
`;

export const DragLeftSection = styled.div`
  flex: 0 0 10px;
  cursor: w-resize;
  background-color: #444;
`;
