const elementsContainer = document.getElementById("elements-panel");
const viewContainer = document.getElementById("view-container");
const panelContainer = document.getElementById("properties-panel");
let style = document.querySelector("style");
if (!style) {
  style = document.createElement("style");
  document.head.appendChild(style);
}
const elements = document.querySelectorAll(".elements-panel-item");
import { CodeJar } from "https://medv.io/codejar/codejar.js";
const cssEditor = document.getElementById("cssEditor");
cssEditor.innerHTML = style.innerHTML;
window.Prism = window.Prism || {};
Prism.manual = true;
const jar = CodeJar(cssEditor, Prism.highlightElement);

const site = {
  element: "div",
  id: "first",
  class: "item",
  "data-id": "0",
  text: "First Level Div",
  children: [
    {
      element: "div",
      id: "second",
      class: "",
      "data-id": "0,0",
      text: "Second Level Div",
      children: [
        {
          element: "div",
          id: "third",
          class: "",
          "data-id": "0,0,0",
          children: [],
        },
      ],
    },
  ],
};
let focusedElement = {};

document.getElementById("saveStyle").addEventListener("click", () => {
  let code = jar.toString();
  style.innerHTML = code;
});

document.getElementById("saveProps").addEventListener("click", () => {
  document.getElementById("second").id = document.getElementById(
    "elementId"
  ).value;
  // renderView();
});

const leftPanelList = document.querySelectorAll(
  "#left-panel .panel-list > div"
);
const leftPanels = document.querySelectorAll("#left-panel .panels > div");
const rightPanelList = document.querySelectorAll(
  "#right-panel .panel-list > div"
);
const rightPanels = document.querySelectorAll("#right-panel .panels > div");

leftPanelList.forEach((item) => {
  item.addEventListener("click", () => {
    let target = document.querySelector(item.dataset.panel);
    leftPanels.forEach((panel) => {
      panel.classList.remove("active");
    });
    leftPanelList.forEach((item) => {
      item.classList.remove("active");
    });
    target.classList.add("active");
    item.classList.add("active");
  });
});

rightPanelList.forEach((item) => {
  item.addEventListener("click", () => {
    let target = document.querySelector(item.dataset.panel);
    rightPanels.forEach((panel) => {
      panel.classList.remove("active");
    });
    rightPanelList.forEach((item) => {
      item.classList.remove("active");
    });
    target.classList.add("active");
    item.classList.add("active");
  });
});

renderView();

elements.forEach((item) => {
  item.onclick = async function (e) {
    const data = await (await fetch("./site.json")).json();
    let nums = focusedElement.dataset.id.split(",");
    nums.pop();
    let selected = site;
    for (const num of nums) {
      selected = selected.children[num];
    }
    // selected.children.push();
    addElement(selected, data[item.dataset.element]);
    renderView();
  };
});

function addElement(parent, child) {
  if (parent.children) {
    child["data-id"] = `${parent["data-id"]},${parent.children.length}`;
    parent.children.push(child);
  }
}

function focusElement(element) {
  panelContainer.children["elementId"].value = element.id;
  panelContainer.children["elementClass"].value = element.className;
  panelContainer.children["text"].value = element.childNodes[0].nodeValue;
  focusedElement = element;
}

function renderView() {
  let content = createElement(site, 0, "");
  viewContainer.innerHTML = content;

  document.querySelectorAll("#view-container *").forEach((item) => {
    item.onclick = function (e) {
      e.stopPropagation();
      focusElement(item);
    };
  });

  /*
  document.querySelectorAll("[contenteditable='true']").forEach((item) => {
    item.addEventListener("paste", function (e) {
      let data = e.clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, data);
      e.preventDefault();
    });
    item.addEventListener("drop", function (e) {
      let data = e.dataTransfer.getData("text/plain");
      document.execCommand("insertHTML", false, data);
      e.preventDefault();
    });
  });
  */
}

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
