import React, { useEffect, useState } from "react";
import Frame from "react-frame-component";
import { useParams } from "react-router-dom";
import { IframeElement } from "../IFrameElement";
import { renderHTML } from "../../scripts/renderHTML";

/* 
  You can use React.createElement
  Using recursion, you can add more elements in side element in the children parameter of React.createElement
  https://stackoverflow.com/questions/31234500/create-react-component-dynamically
*/

export function ViewSection({ children, ...props }) {
  const { pageId } = useParams();
  const [site, setSite] = useState();

  useEffect(() => {
    (async (pageId) => {
      const { site } = await (await fetch(`/page/${pageId}`)).json();
      setSite(site);
    })(pageId);
  }, [pageId]);

  return site ? (
    <Frame
      style={{ flex: 1, border: "none" }}
      initialContent='<!DOCTYPE html><html><head><link href="/core.css" rel="stylesheet"></head><body id="body"><script src="/core.js"></script></body></html>'
      mountTarget="#body"
    >
      {/* <IframeElement tagName="div" text="This is a div" /> */}
      <RenderElements children={site.body.children} level={1} />
    </Frame>
  ) : (
    ""
  );
}

const RenderElements = ({ children, level }) => {
  return children.map(({ children, classes, ...item }, i) => {
    return (
      <IframeElement
        key={i}
        className={classes ? "frame-element " + classes.join(" ") : ""}
        {...item}
      >
        {children && <RenderElements children={children} level={level + 1} />}
      </IframeElement>
    );
  });
};

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
