const elements = document.querySelectorAll(".frame-element");
elements.forEach((item) => {
  item.onmouseover = function (e) {};
  item.onmouseout = function (e) {};

  if (item.nodeName === "A") {
    item.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }
});
