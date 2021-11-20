import React from "react";
import { Link } from "react-router-dom";
import {
  Author,
  FeatureImage,
  FeatureItem,
  Features,
  HeroSection,
  HomeLinks,
  MainSection,
} from "../../components/home/Home";

export function HomePage() {
  document.title = "DevBuilder - Website Builder for Developers";
  return (
    <MainSection>
      <HeroSection>
        <div>
          <img src="/assets/homelogo.png" alt="DevBuilder Logo" />
        </div>
        <h2>Website Builder for Developers</h2>
        <HomeLinks>
          <Link to="/login">Get Started</Link>
          <a
            href="https://www.youtube.com/watch?v=M2nBg4cFzWY"
            target="_blank"
            rel="noreferrer"
          >
            Watch Tutorial
          </a>
        </HomeLinks>
        <Author>
          Developed by{" "}
          <a
            href="https://aadityabhusal.com.np/"
            alt="Author"
            target="_blank"
            rel="noreferrer"
          >
            Aaditya Bhusal
          </a>
        </Author>
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
