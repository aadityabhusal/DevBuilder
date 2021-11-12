import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
import { CloseIcon } from "../../../../components/ui/Icons";
import {
  Panel,
  PanelItems,
  PanelTitle,
} from "../../../../components/editor/Panel";
import {
  DeletePage,
  PageInputText,
  PageItem,
  PageList,
} from "../../../../components/editor/LeftSection";
import { UserContext } from "../../../../contexts/UserContext";

export function PagesPanel({ pages, isActive }) {
  const [pageList, setPageList] = useState(pages);
  const { setPageTree } = useContext(PageTreeContext);
  const { siteId } = useParams();
  const { authFetch } = useContext(UserContext);

  const addPage = async (e) => {
    if (e.keyCode === 13) {
      let value = e.target.value;
      if (value.includes(".html")) value = value.replace(".html", "");
      value = value + ".html";
      try {
        let data = await authFetch(`/api/page/`, "POST", {
          body: { siteId, name: value },
        });
        setPageList(data);
      } catch (error) {}
      e.target.value = "";
    }
  };

  const setPage = async (e, item) => {
    try {
      let response = await authFetch(`/api/page/${item.pageId}`, "GET");
      setPageTree(response);
    } catch (error) {}
  };

  const deletePage = async (e, item) => {
    e.stopPropagation();
    try {
      let data = await authFetch(`/api/page/${item.pageId}`, "DELETE", {
        body: { siteId },
      });
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
          placeholder="Type HTML filename and hit enter"
          onKeyUp={addPage}
        />
      </PanelItems>
    </Panel>
  );
}
