export function renderHTML(element) {
  function createElement(obj) {
    let name = obj.element;
    let props = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (
          typeof obj[key] != "object" &&
          obj[key] !== null &&
          key !== "element" &&
          key !== "text"
        ) {
          props.push(`${key}="${obj[key]}"`);
        }
      }
    }

    let children = "";
    if (Array.isArray(obj.children)) {
      children += loopThroughElements(obj.children);
    }
    let text = obj.text || "";
    let result = `<${name} ${props.join(" ")}>${text} ${children}</${name}>`;
    return result;
  }

  function loopThroughElements(arr) {
    let result = "";
    for (const item of arr) {
      result += createElement(item);
    }
    return result;
  }

  return createElement(element);
}
