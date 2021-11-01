import React, { useContext, useEffect, useState } from "react";
import { Panel, PanelTitle } from "../../../../components/editor/Panel";
import { NavigatorContainer } from "../../../../components/editor/LeftSection";

import { PageTreeContext } from "../../../../contexts/PageTreeContext";
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
          data={pageTree.body.children[pageTree.body.children_order[0]]}
          firstDrop={true}
        ></NavigatorList>
      </NavigatorContainer>
    </Panel>
  ) : null;
}
