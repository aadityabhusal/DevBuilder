import React, { useContext, useEffect, useState } from "react";
import { Panel, PanelTitle } from "../Panel";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
import styled from "styled-components";
import { NavigatorList } from "./NavigatorList";

export function NavigatorPanel({ isActive }) {
  const [navigatorTree, setNavigatorTree] = useState();
  const { pageTree } = useContext(PageTreeContext);

  useEffect(() => {
    setNavigatorTree(pageTree);
  }, [pageTree]);
  return navigatorTree ? (
    <Panel className={isActive}>
      <PanelTitle>Navigator</PanelTitle>
      <NavigatorContainer>
        <NavigatorList
          data={pageTree.body.children[Object.keys(pageTree.body.children)[0]]}
          firstDrop={true}
        ></NavigatorList>
      </NavigatorContainer>
    </Panel>
  ) : null;
}

const NavigatorContainer = styled.div`
  border: 1px solid #bdc3c7;
  flex: 1;
  :last-child {
    border-top: 1px solid #bdc3c7;
  }
`;
