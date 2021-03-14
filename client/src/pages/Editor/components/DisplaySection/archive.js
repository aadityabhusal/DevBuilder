import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IframeElement } from "../IFrameElement";

const ViewContainer = styled.iframe`
  flex: 1;
  border: none;
`;

const getSiteHTML = (iframeRef, bodyContent) => {};

export function ViewSection({ children, ...props }) {
  const { pageId } = useParams();
  const [site, setSite] = useState();
  // const [iframeRef, setIframeRef] = useState();

  useEffect(() => {
    const getSite = async (pageId) => {
      const { site } = await (await fetch(`/page/${pageId}`)).json();
      setSite(site);
    };
    getSite(pageId);
  }, [pageId]);
  if (site) {
    console.log("OKOK", renderView(site.body));
  }
  return site ? (
    <ViewContainer
      element={site.body}
      children={renderView(site.body)}
    ></ViewContainer>
  ) : (
    // <ViewContainer
    //   ref={iframeRef}
    //   src={"data:text/html," + encodeURIComponent(renderHTML(site.body))}
    // ></ViewContainer>
    ""
  );
}

function renderView(element) {
  const childList = [];
  const createElement = (element) => {
    // console.log(element);
    if (Array.isArray(element.children)) {
      childList.push(loopThroughElements(element.children));
    }
    return (
      <IframeElement
        tagName={element.element}
        childrenET={childList}
      ></IframeElement>
    );
  };

  const loopThroughElements = (children) => {
    let result = [];
    for (const item of children) {
      result.push(createElement(item));
    }
    return result;
  };
  return createElement(element);
}

const RenderElements2 = ({ children, classes, level, ...props }) => {
  return (
    <IframeElement className={classes ? classes.join(" ") : ""} {...props}>
      {children.children &&
        children.map((item, i) => (
          <RenderElements key={i} {...item} level={level + 1} />
        ))}
    </IframeElement>
  );
};
