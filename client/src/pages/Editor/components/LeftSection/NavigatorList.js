import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SelectedElementContext } from "../../../../contexts/SelectedElementContext";
import { showHoverBox } from "../../../../utils";

export function NavigatorList({ data }) {
  const [element, setNavigatorItem] = useState();
  const { setSelectedElement } = useContext(SelectedElementContext);

  useEffect(() => {
    setNavigatorItem(data);
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
      <NavigatorListItem
        length={element.path.length}
        onMouseOver={handleHover}
        onClick={handleClick}
      >
        {element.path.map((item, i) => (
          <VerticalLines key={i} />
        ))}
        <NavigatorItemName>{element.tagName}</NavigatorItemName>
      </NavigatorListItem>
      {element.children_order.length
        ? element.children_order.map((elem) => {
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
