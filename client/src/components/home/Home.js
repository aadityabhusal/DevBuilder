import styled from "styled-components";

export const MainSection = styled.div``;

export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #34495e;
  color: #ecf0f1;
  height: 50vh;

  & a {
    border: 1px solid #ecf0f1;
    padding: 10px 20px;
    margin-top: 50px;
    text-decoration: none;
    background-color: #27ae60;
    color: #ecf0f1;
    transition: 0.2s ease transform;
  }

  & a:hover {
    transform: scale(1.1);
  }
`;

export const Features = styled.div`
  background-color: #383f4c;
  & > h2 {
    text-align: center;
    margin: 0 30%;
    padding: 20px 0;
    color: #ecf0f1;
  }
`;

export const FeatureItem = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  border-bottom: 1px solid #ecf0f1;
  & h2 {
    flex: 0 0 30%;
    align-self: center;
    color: #ecf0f1;
  }
`;
export const FeatureImage = styled.div`
  flex: 0 0 30%;
  margin-left: 10%;

  & img {
    width: 100%;
  }
`;
