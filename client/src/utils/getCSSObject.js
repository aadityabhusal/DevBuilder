export function getCSSText(styleText) {
  let object = {};
  let removedNewLine = styleText.replace(/[\n\r]+/g, "").split(";");

  removedNewLine.forEach((item) => {
    if (item) {
      let prop = item.split(":");
      object[prop[0].trim()] = prop[1].trim();
    }
  });
  return object;
}
