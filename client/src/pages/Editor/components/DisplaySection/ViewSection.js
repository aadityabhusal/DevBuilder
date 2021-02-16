import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ViewContainer = styled.iframe`
  flex: 1;
  border: none;
`;

const getSiteHTML = () => {};

export function ViewSection() {
  const { pageId } = useParams();
  const [site, setSite] = useState();
  useEffect(() => {
    const getSite = async (pageId) => {
      const site = await (await fetch(`/page/${pageId}`)).json();
      setSite(site);
    };
    getSite(pageId);
  }, [pageId]);
  if (site) {
    console.log(site);
  }
  return <ViewContainer></ViewContainer>;
}
