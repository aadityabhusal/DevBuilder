import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainSection = styled.div``;

const HeroSection = styled.div`
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

const Features = styled.div`
  background-color: #383f4c;
  & > h2 {
    text-align: center;
    margin: 0 30%;
    padding: 20px 0;
    color: #ecf0f1;
  }
`;

const FeatureItem = styled.div`
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
const FeatureImage = styled.div`
  flex: 0 0 30%;
  margin-left: 10%;

  & img {
    width: 100%;
  }
`;

export function HomePage() {
  return (
    <MainSection>
      <HeroSection>
        <h1>Create your website with WebCreator</h1>
        <Link to="/editor/606484eba2802d3304e992fb">Get Started</Link>
      </HeroSection>
      <Features>
        <h2>Features</h2>
        <FeatureItem style={{ backgroundColor: "#303541" }}>
          <h2>Drag and Drop Elements</h2>
          <FeatureImage>
            <img src="/assets/images/dnd.jpg" alt="Drag and Drop Elements" />
          </FeatureImage>
        </FeatureItem>
        <FeatureItem style={{ backgroundColor: "#272b35" }}>
          <h2>CSS Page Styling</h2>
          <FeatureImage>
            <img src="/assets/images/styling.jpg" alt="Page Styling" />
          </FeatureImage>
        </FeatureItem>
        <FeatureItem style={{ backgroundColor: "#1e2229" }}>
          <h2>Simple and Clean Interface</h2>
          <FeatureImage>
            <img
              src="/assets/images/clean.jpg"
              alt="Simple and Clean Interface"
            />
          </FeatureImage>
        </FeatureItem>
        <FeatureItem style={{ backgroundColor: "#16181d" }}>
          <h2>Export HTML and CSS code</h2>
          <FeatureImage>
            <img
              src="/assets/images/layout.jpg"
              alt="Export HTML and CSS code"
            />
          </FeatureImage>
        </FeatureItem>
      </Features>
    </MainSection>
  );
}
