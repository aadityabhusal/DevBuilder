import styled from "styled-components";

export const EditContainer = styled.div`
  position: relative;
  margin-top: 20px;
  flex: 0 0 400px;
  padding: 20px;
  box-shadow: 0 5px 20px 0 #444;
`;

export const Form = styled.form`
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const EditUserInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #666;
  border-radius: 3px;
  margin-bottom: 10px;
  outline: 0;
  font-size: 15px;
`;

export const EditUserButton = styled.button`
  padding: 10px;
  border-radius: 3px;
  border: none;
  color: #fff;
  background-color: #34495e;
  cursor: pointer;
  outline: 0;
`;

export const SuccessMessage = styled.div`
  padding: 10px;
  border: 1px solid 34495e;
  box-shadow: 0 2px 5px 0 #444;
  margin-bottom: 20px;
  color: #fff;
  background: #2ecc71;
  text-align: center;
`;
