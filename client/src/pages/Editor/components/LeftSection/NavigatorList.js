import { useContext, useEffect, useState } from "react";
import {
  DropDownArrow,
  NavigatorItemName,
  NavigatorListContainer,
  NavigatorListItem,
  VerticalLines,
} from "../../../../components/editor/LeftSection";
import { hideHoverBox, showHoverBox } from "../../../../utils";
import { DropDownIcon } from "../../../../components/ui/Icons";
import { PageTreeContext } from "../../../../contexts/PageTreeContext";
const nonClosingTags = ["img", "video", "input", "hr", "br"];

export function NavigatorList({
  data,
  parentElement,
  offset = 0,
  mappedData,
  handlePropMap,
}) {
  const [element, setElement] = useState();
  const [isDropped, setIsDropped] = useState(true);
  const { setSelectedElement } = useContext(PageTreeContext);

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
      <div style={{ display: "flex" }}>
        <NavigatorListItem
          onMouseOver={handleHover}
          onMouseOut={handleMouseOut}
          onClick={handleClick}
        >
          {element.path.slice(offset).map((item, i) => (
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
        {handlePropMap && mappedData ? (
          <>
            <select
              defaultValue={mappedData[element._id]?.attribute}
              onChange={(e) =>
                handlePropMap(element._id, "attribute", e.target.value)
              }
            >
              {element.text ? <option value="text">text</option> : null}
              {Object.keys(element.attributes).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <input
              defaultValue={mappedData[element._id]?.property || ""}
              style={{ width: "100px" }}
              placeholder="Property name"
              onKeyDown={(e) =>
                e.keyCode === 13 &&
                handlePropMap(element._id, "property", e.target.value)
              }
            />
          </>
        ) : null}
      </div>
      {isDropped && !nonClosingTags.includes(element.tagName)
        ? element.children_order.map((elem) => {
            return (
              <NavigatorList
                key={element.children[elem]._id}
                data={element.children[elem]}
                parentElement={element}
                offset={offset}
                mappedData={mappedData}
                handlePropMap={handlePropMap}
              ></NavigatorList>
            );
          })
        : null}
    </NavigatorListContainer>
  ) : null;
}
