import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SiteTreeContext } from "../../../../contexts/SiteTreeContext";
import {
  Panel,
  PanelInputText,
  PanelItem,
  PanelItems,
  PanelTitle,
} from "../Panel";

const PageList = styled.div`
  max-height: 200px;
  overflow: auto;
`;

const PageInputText = styled(PanelInputText)`
  flex: 0 1 100%;
  margin-top: 10px;
`;

const PageItem = styled.div`
  padding: 10px;
  border: 1px solid #eee;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const DeletePage = styled.div``;

export function PagesPanel({ isActive }) {
  const [currentPage, setCurrentPage] = useState([]);
  const [pageList, setPageList] = useState([]);
  const { siteTree, updateStyles, saveSite } = useContext(SiteTreeContext);

  useEffect(() => {
    // let pages = Object.entries(siteTree.head.styles);
    // setPageList(pages);
    // setCurrentPage([styles[0][0], siteTree.head.styles[styles[0][0]]]);
  }, []);

  const addPage = (e) => {
    if (e.keyCode === 13) {
      let value = e.target.value;
      // updateStyles(value);
      setPageList((prev) => [...prev, [value, ""]]);
      // saveSite();
      e.target.value = "";
    }
  };

  const deletePage = () => {};
  return (
    <Panel className={isActive}>
      <PanelTitle>Pages</PanelTitle>
      <PanelItems cols={1}>
        <PageList>
          <PageItem data-page="page1">Page 1</PageItem>
          {pageList.map((item) => (
            <PageItem key={item[0]} onClick={(e) => setCurrentPage(item)}>
              {item[0]}
              <DeletePage onClick={(e) => DeletePage(e, item[0])}>x</DeletePage>
            </PageItem>
          ))}
        </PageList>
        <PageInputText
          placeholder="Type name and hit enter"
          onKeyUp={addPage}
        />
      </PanelItems>
    </Panel>
  );
}
