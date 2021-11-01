import styled from "styled-components";

export const SignupSection = styled.div`
  display: flex;
  justify-content: center;
`;

export const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 320px;
  border: 1px solid #bdc3c7;
  margin-top: 40px;
  padding: 20px;
  box-shadow: 0 5px 10px 0 #bdc3c7;

  & h1 {
    text-align: center;
    margin-bottom: 50px;
  }

  & form {
    margin: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  & input,
  button {
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    border: 1px solid #34495e;
    outline: 0;
  }

  & button {
    background-color: #34495e;
    color: #fff;
    margin-top: 30px;
    cursor: pointer;
    transition: 0.2s ease all;
    box-shadow: 0 5px 10px 0 #bdc3c7;
  }

  & button:hover {
    box-shadow: none;
  }
`;
