import styled from "styled-components";
import { Link } from "react-router-dom";

export const UserHead = styled.div`
  margin: 0 20%;
  border-bottom: 2px solid #34495e;
  display: flex;
  align-items: center;
  & img {
    width: 100px;
    height: 100px;
    margin-right: 30px;
  }

  & h1,
  h2 {
    margin-bottom: 0;
  }

  & > div {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-bottom: 20px;
  }
`;

export const Sites = styled.div`
  padding: 20px;
  margin: 0 20%;
`;

export const SiteForm = styled.div`
  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #34495e;

  & input {
    flex: 1;
    border: 1px solid #34495e;
    outline: 0;
    padding: 8px;
    margin-right: 20px;
  }

  & button {
    background-color: #34495e;
    border: none;
    color: #fff;
    padding: 8px;
    outline: 0;
    cursor: pointer;
  }
`;

export const SiteList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Site = styled.div`
  flex: 0 0 25%;
  padding: 10px;
  margin: 20px 2%;
  box-shadow: 0 5px 10px 0 #bdc3c7;
  border-radius: 3px;
  text-align: center;

  & img {
    width: 100%;
  }

  & a {
    text-decoration: none;
    color: #34495e;
  }

  & a:hover {
    text-decoration: underline;
  }
`;

export const EditUserButton = styled(Link)`
  background-color: #34495e;
  border: none;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  align-self: flex-end;
`;
