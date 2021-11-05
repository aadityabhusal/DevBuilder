function getBodyHTML(element) {
  let children = "";
  let attributes = [""];
  let elementAttributes = element.attributes;

  for (const key in elementAttributes) {
    if (elementAttributes[key] !== "") {
      attributes.push(`${key}="${elementAttributes[key]}"`);
    }
  }

  if (element.children && Object.keys(element.children).length) {
    children += loopThroughChildren(element.children);
  }

  let result = `<${element.tagName}${attributes.join(" ")}>${
    element.text ? element.text.join(" ") : ""
  }${children}</${element.tagName}>`;

  return result;
}

function loopThroughChildren(children) {
  let result = "";
  for (const key in children) {
    result += getBodyHTML(children[key]);
  }
  return result;
}

function getHeadHTML(element) {
  let result = "";
  for (const headKey in element) {
    const headItem = element[headKey];
    if (typeof headItem == "object") {
      if (Object.keys(headItem).length && headKey !== "style") {
        for (const itemKey in headItem) {
          const item = headItem[itemKey];
          result += `<${headKey}>${item}</${headKey}>`;
        }
      }
    } else {
      result += `<${headKey}>${headItem}</${headKey}>`;
    }
  }
  return result;
}

function getStyles(styleObj, pageName) {
  let links = "";
  let styles = [];
  for (const itemKey in styleObj) {
    links += `<link rel="stylesheet" href="./${pageName}/${itemKey}.css">`;
    let cssText = getCSSText(styleObj[itemKey].styles);
    styles.push([`${itemKey}.css`, cssText]);
  }
  return { links, styles };
}

function getCSSText(styleBlocks) {
  let result = styleBlocks.map((block) => {
    let list = block.style.map((item) => {
      return `${item.name}:${item.value};`;
    });
    return `${block.selector}{${list.join("")}}`;
  });
  return result.join("");
}

module.exports = { getHeadHTML, getBodyHTML, getStyles };
