export function getDragAfterElement(container, x, y) {
  const draggableElements = [...container.querySelectorAll(".frame-element")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offsetTop = y < box.top + box.height * 0.2;
      const offsetLeft = x < box.left + box.width * 0.2;
      /* Needs Some Improvement */
      if (offsetTop && offsetTop > closest.offset) {
        child.classList.add("vertical-dragging");
        return { element: child, offset: offsetTop };
      } else if (offsetLeft && offsetLeft > closest.offset && y < box.bottom) {
        child.classList.add("horizontal-dragging");
        return { element: child, offset: offsetLeft };
      } else {
        child.classList.remove("vertical-dragging", "horizontal-dragging");
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
