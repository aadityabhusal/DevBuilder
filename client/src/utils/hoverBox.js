export function showHoverBox(element, color = "#3498db") {
  try {
    let outlineBox = document.getElementById("outlineBox");
    let draggedElement = localStorage.getItem("draggedElement");
    if (draggedElement !== "") {
      draggedElement = JSON.parse(draggedElement);
      let _id = element.dataset._id;
      let includesId = draggedElement.children_order?.includes(_id);
      if (_id === draggedElement._id || includesId) return;
    }
    let topBarHeight = 36;
    let { top, left, width, height } = element.getBoundingClientRect();
    outlineBox.style.transform = `translate(${left}px, ${
      top + topBarHeight
    }px)`;
    outlineBox.style.width = width - 2 + "px";
    outlineBox.style.height = height - 2 + "px";
    outlineBox.style.border = "1px solid" + color;
    outlineBox.style.display = "flex";
    outlineBox.children[0].innerHTML = element.tagName;
  } catch (error) {}
}

export function hideHoverBox(e) {
  let outlineBox = document.getElementById("outlineBox");
  outlineBox.style.display = "none";
}
