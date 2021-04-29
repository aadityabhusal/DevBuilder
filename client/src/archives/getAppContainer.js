const getAppContainer = () => {
  let elementId = performance.now().toString(36).replace(/\./g, "");
  let elementData = {
    _id: elementId,
    path: [],
    tagName: "div",
    classes: ["container"],
    text: "",
    attributes: {
      id: "page-container",
    },
    children: {},
  };

  return {
    elementId,
    elementData,
  };
};
