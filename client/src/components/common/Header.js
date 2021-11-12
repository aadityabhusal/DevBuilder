import styled from "styled-components";

export const HeaderContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: #24265d;
  box-shadow: 0 3px 4px 0 rgb(0 0 0 / 15%);

  & a {
    text-decoration: none;
    margin-left: 20px;
    color: #3498db;
  }

  & a:hover {
    text-decoration: underline;
  }

  & .is-active {
    color: #24265d;
  }
`;

export const Logo = styled.div`
  height: 50px;

  img {
    height: 100%;
  }
`;
