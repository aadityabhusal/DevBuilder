import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
import { CloseIcon } from "../Icons";
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

const PageItem = styled(PanelItem)`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeletePage = styled.div``;

export function PagesPanel({ pages, isActive }) {
  const [pageList, setPageList] = useState(pages);
  const { setPageTree } = useContext(PageTreeContext);
  const { siteId } = useParams();

  const addPage = async (e) => {
    if (e.keyCode === 13) {
      let value = e.target.value;
      try {
        let response = await fetch(`/page/`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ siteId, name: value }),
        });
        let data = await response.json();
        setPageList(data);
      } catch (error) {}
      e.target.value = "";
    }
  };

  const setPage = async (e, item) => {
    try {
      const response = await (await fetch(`/page/${item.pageId}`)).json();
      setPageTree(response);
    } catch (error) {}
  };

  const deletePage = async (e, item) => {
    e.stopPropagation();
    try {
      let response = await fetch(`/page/${item.pageId}`, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ siteId }),
      });
      let data = await response.json();
      setPageList(data);
    } catch (error) {}
  };

  return (
    <Panel className={isActive}>
      <PanelTitle>Pages</PanelTitle>
      <PanelItems cols={1}>
        <PageList>
          {pageList.map((item) => (
            <PageItem key={item.pageId} onClick={(e) => setPage(e, item)}>
              {item.pageName}
              {item.pageName !== "index.html" && (
                <DeletePage onClick={(e) => deletePage(e, item)}>
                  <CloseIcon></CloseIcon>
                </DeletePage>
              )}
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
