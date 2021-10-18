import { useState } from "react";
import styled from "styled-components";
import { StyleBlock } from "./StyleBlock";

export function StyleEditor({ styleList, handleEditor }) {
  const [styleBlocks, setStyleBlocks] = useState(styleList);

  /* 
    - Validate blocks by checking if the selector is empty or similar to other selector
    - Make the "Add new Style" button stick to the bottom 
    - when add new button is created focus on the selector input of the last item of the array
  */

  const addNewStyle = () => {
    let newStyle = {
      selector: "",
      style: [],
    };
    setStyleBlocks((blocks) => {
      let temp = [...blocks];
      temp.push(newStyle);
      return temp;
    });
  };
  return (
    <StyleContainer id="style-container">
      <StyleBlockList>
        {styleBlocks.map((styleBlock, i) => (
          <StyleBlock data={styleBlock} key={i} />
        ))}
      </StyleBlockList>
      <AddNewStyle onClick={addNewStyle}>Add New Style</AddNewStyle>
    </StyleContainer>
  );
}

const StyleContainer = styled.div`
  flex: 1;
  height: calc(100% - 200px);
  padding-top: 15px;
  display: flex;
  flex-direction: column;
`;

const StyleBlockList = styled.div`
  flex: 1;
  overflow-y: auto;
  border-bottom: 1px solid #bdc3c7;
`;

const AddNewStyle = styled.button`
  padding: 10px 15px;
  margin: 10px;
  border: 1px solid #bdc3c7;
  cursor: pointer;
  align-self: flex-end;
  font-weight: bold;
  background-color: #34495e;
  color: #eee;
`;
