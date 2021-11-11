export function closeContextMenu(e) {
  let contextMenu = document.getElementById("context-menu");
  contextMenu.style.display = "none";
}

export function showContextMenu(e) {
  let contextMenu = document.getElementById("context-menu");
  contextMenu.style.display = "flex";
  let leftPanelWidth = document.getElementById("left-panel").clientWidth + 10;
  let top = e.clientY + 40;
  let left = e.clientX;
  let yDiff = e.clientY + 210 - window.innerHeight;
  let xDiff = e.clientX + leftPanelWidth + 100 - window.innerWidth;
  if (yDiff > 0) top = window.innerHeight - 180;
  if (xDiff > 0) left = window.innerWidth - leftPanelWidth - 100;
  console.log(e.clientX + leftPanelWidth + 100, window.innerWidth);
  contextMenu.style.transform = `translate(${left}px,${top}px)`;
}
