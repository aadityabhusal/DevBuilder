import { useState } from "react";
import styled from "styled-components";
import { StyleBlock } from "./StyleBlock";

export function StyleEditor({ styleList, handleEditor }) {
  const [styleBlocks, setStyleBlocks] = useState(styleList);

  const addNewStyle = () => {
    let newStyle = {
      selector: "",
      style: [["", "", false]],
    };
    setStyleBlocks((blocks) => {
      let temp = [...blocks];
      temp.push(newStyle);
      return temp;
    });
  };
  return (
    <StyleContainer id="style-container">
      {styleBlocks.map((styleBlock, i) => (
        <StyleBlock data={styleBlock} key={i} />
      ))}
      <AddNewStyle onClick={addNewStyle}>Add New Style</AddNewStyle>
    </StyleContainer>
  );
}

const StyleContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
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
