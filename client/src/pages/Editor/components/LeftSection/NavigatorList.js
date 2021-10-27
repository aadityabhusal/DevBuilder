import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SelectedElementContext } from "../../../../contexts/SelectedElementContext";
import { showHoverBox } from "../../../../utils";
const nonClosingTags = ["img", "video", "input", "hr", "br"];

export function NavigatorList({ data }) {
  const [element, setElement] = useState();
  const { setSelectedElement } = useContext(SelectedElementContext);

  useEffect(() => {
    if (data) {
      setElement((prev) => data);
    }
  }, [data]);

  const handleHover = (e) => {
    let item = document
      .getElementById("iframe-view")
      .contentDocument.querySelector(`[data-_id='${element._id}']`);
    showHoverBox(item);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  return element ? (
    <NavigatorListContainer>
      <NavigatorListItem onMouseOver={handleHover} onClick={handleClick}>
        {element.path.map((item, i) => (
          <VerticalLines key={i} />
        ))}
        <NavigatorItemName>{element.tagName}</NavigatorItemName>
      </NavigatorListItem>
      {!nonClosingTags.includes(element.tagName)
        ? element.children_order.map((elem) => {
            element.children[elem].path = [...element.path, element._id];
            return (
              <NavigatorList
                key={element.children[elem]._id}
                data={element.children[elem]}
              ></NavigatorList>
            );
          })
        : null}
    </NavigatorListContainer>
  ) : null;
}

const NavigatorListContainer = styled.div`
  background-color: #fff;
  cursor: pointer;
`;

const NavigatorListItem = styled.div`
  border-bottom: 1px solid #bdc3c7;
  font-size: 14px;
  display: flex;
  :hover {
    background-color: #ecf0f1;
  }
`;

const NavigatorItemName = styled.div`
  padding-left: 5px;
  background-color: inherit;
`;

const VerticalLines = styled.div`
  margin-left: 8px;
  border: none;
  border-left: 1px solid #bdc3c7;
`;
