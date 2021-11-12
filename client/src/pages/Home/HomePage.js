import React from "react";
import { Link } from "react-router-dom";
import {
  FeatureImage,
  FeatureItem,
  Features,
  HeroSection,
  MainSection,
} from "../../components/home/Home";

export function HomePage() {
  return (
    <MainSection>
      <HeroSection>
        <div>
          <img src="/assets/homelogo.png" alt="DevBuilder Logo" />
        </div>
        <h2>Website Builder for Developers</h2>
        <Link to="/login">Get Started</Link>
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
            <img src="/assets/images/styling.png" alt="Page Styling" />
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
