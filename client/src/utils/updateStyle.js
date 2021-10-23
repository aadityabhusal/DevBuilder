export function updateStyle(styleName, styleBlocks, getCSSText) {
  let stylesheet = document
    .getElementById("iframe-view")
    .contentDocument.getElementById(styleName + "-stylesheet");

  if (stylesheet) stylesheet.innerHTML = getCSSText(styleBlocks);
}
