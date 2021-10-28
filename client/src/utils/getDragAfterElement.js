export function getDragAfterElement(container, x, y) {
  const draggableElements = [...container.querySelectorAll(".frame-element")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offsetTop = y < box.top + box.height * 0.2;
      const offsetLeft = x < box.left + box.width * 0.2;
      if (offsetTop && offsetTop > closest.offset) {
        moveLine(box, "vertical");
        return { element: child, offset: offsetTop };
      } else if (offsetLeft && offsetLeft > closest.offset && y < box.bottom) {
        moveLine(box, "horizontal");
        return { element: child, offset: offsetLeft };
      } else {
        document.addEventListener("dragend", hideLine);
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function hideLine() {
  document.getElementById("after-element-line").style.display = "none";
  document.removeEventListener("dragend", hideLine);
}

function moveLine(box, type) {
  let afterElementLine = document.getElementById("after-element-line");
  let { top, left, width, height } = box;

  afterElementLine.style.top = top + "px";
  afterElementLine.style.left = left + "px";
  afterElementLine.style.display = "block";

  if (type === "vertical") {
    afterElementLine.style.height = "1px";
    afterElementLine.style.width = width - 2 + "px";
    afterElementLine.style.borderTop = "2px solid #2ecc71";
  } else if (type === "horizontal") {
    afterElementLine.style.width = "1px";
    afterElementLine.style.height = height - 2 + "px";
    afterElementLine.style.borderLeft = "2px solid #2ecc71";
  }
}
