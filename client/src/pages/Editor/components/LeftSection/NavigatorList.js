import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SelectedElementContext } from "../../../../contexts/SelectedElementContext";
import { hideHoverBox, showHoverBox } from "../../../../utils";
import { DropDownIcon } from "../Icons";
const nonClosingTags = ["img", "video", "input", "hr", "br"];

export function NavigatorList({ data, firstDrop }) {
  const [element, setElement] = useState();
  const [isDropped, setIsDropped] = useState(firstDrop || false);
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

  const handleMouseOut = (e) => {
    let item = document
      .getElementById("iframe-view")
      .contentDocument.querySelector(`[data-_id='${element._id}']`);
    hideHoverBox(item);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  const handleDrop = (e) => {
    e.stopPropagation();
    setIsDropped((prev) => !prev);
  };

  return element ? (
    <NavigatorListContainer>
      <NavigatorListItem
        onMouseOver={handleHover}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      >
        {element.path.map((item, i) => (
          <VerticalLines key={i} />
        ))}
        {!nonClosingTags.includes(element.tagName) &&
        element.children_order.length ? (
          <DropDownArrow isDropped={isDropped} onClick={handleDrop}>
            <DropDownIcon />
          </DropDownArrow>
        ) : null}
        <NavigatorItemName>{element.tagName}</NavigatorItemName>
      </NavigatorListItem>
      {isDropped && !nonClosingTags.includes(element.tagName)
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
`;

const DropDownArrow = styled.div`
  align-self: stretch;
  cursor: pointer;
  ${({ isDropped }) => !isDropped && `transform: rotate(-90deg);`}

  svg {
    fill: #7f8c8d;
    height: 20px;
    width: 20px;
    vertical-align: middle;
  }

  :hover svg {
    fill: #000;
  }
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
  margin-left: 10px;
  border: none;
  border-left: 1px solid #bdc3c7;
`;
