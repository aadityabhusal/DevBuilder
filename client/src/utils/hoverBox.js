export function showHoverBox(element, color = "#3498db") {
  let outlineBox = document.getElementById("outlineBox");

  let { top, left, width, height } = element.getBoundingClientRect();
  outlineBox.style.top = top + "px";
  outlineBox.style.left = left + "px";
  outlineBox.style.width = width - 2 + "px";
  outlineBox.style.height = height - 2 + "px";
  outlineBox.style.border = "1px solid" + color;
  outlineBox.style.display = "block";
}

export function hideHoverBox(e) {
  let outlineBox = document.getElementById("outlineBox");
  outlineBox.style.display = "none";
}
