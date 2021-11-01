import styled from "styled-components";

export const HeaderContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  background-color: #34495e;
  color: #ecf0f1;

  & a {
    text-decoration: none;
    margin-left: 20px;
    color: #ecf0f1;
  }

  & a:hover {
    text-decoration: underline;
  }

  & .is-active {
    color: #00a8ff;
  }
`;
