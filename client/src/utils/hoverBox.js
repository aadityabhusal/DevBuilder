export function showHoverBox(element, color = "#3498db") {
  try {
    let outlineBox = document.getElementById("outlineBox");
    let draggedElement = JSON.parse(localStorage.getItem("draggedElement"));
    if (
      element.dataset._id === draggedElement._id ||
      draggedElement.children_order?.includes(element.dataset._id)
    )
      return;

    let { top, left, width, height } = element.getBoundingClientRect();
    outlineBox.style.top = top + "px";
    outlineBox.style.left = left + "px";
    outlineBox.style.width = width - 2 + "px";
    outlineBox.style.height = height - 2 + "px";
    outlineBox.style.border = "1px solid" + color;
    outlineBox.style.display = "block";
  } catch (error) {}
}

export function hideHoverBox(e) {
  let outlineBox = document.getElementById("outlineBox");
  outlineBox.style.display = "none";
}
