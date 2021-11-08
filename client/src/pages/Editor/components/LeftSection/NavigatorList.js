import { useContext, useEffect, useState } from "react";
import {
  DropDownArrow,
  NavigatorItemName,
  NavigatorListContainer,
  NavigatorListItem,
  VerticalLines,
} from "../../../../components/editor/LeftSection";
import { SelectedElementContext } from "../../../../contexts/SelectedElementContext";
import { hideHoverBox, showHoverBox } from "../../../../utils";
import { DropDownIcon } from "../../../../components/ui/Icons";
const nonClosingTags = ["img", "video", "input", "hr", "br"];

export function NavigatorList({ data, parentElement, firstDrop }) {
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
    let from = parentElement._id
      ? parentElement.children_order.indexOf(element._id)
      : null;
    setSelectedElement((prev) => ({ element, from }));
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
                parentElement={element}
              ></NavigatorList>
            );
          })
        : null}
    </NavigatorListContainer>
  ) : null;
}
