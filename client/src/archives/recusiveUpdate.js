let obj = {
  _id: "id0",
  value: "Root",
  path: [],
  children: {
    id1: {
      _id: "id1",
      value: "First",
      path: [],
      children: {
        id2: {
          _id: "id2",
          value: "Second",
          path: ["id1"],
          children: {},
        },
        id3: {
          _id: "id3",
          value: "Third",
          path: ["id1"],
          children: {
            id4: {
              _id: "id4",
              value: "Fourth",
              path: ["id1", "id3"],
              children: {},
            },
          },
        },
      },
    },
  },
};

let element = {
  _id: "id5",
  value: "Changed",
  path: ["id1", "id3", "id4"],
  children: {},
};

function update(site, element, action = "", level = 0) {
  if (level === element.path.length - 1) {
    let lastItem = element.path[element.path.length - 1];
    if (site.hasOwnProperty(lastItem)) {
      action === "delete"
        ? delete site[lastItem].children[element._id]
        : (site[lastItem].children[element._id] = element);
    }
    return;
  } else {
    update(site[element.path[level]].children, element, action, level + 1);
  }
}

console.log(obj);

console.log(update(obj.children, element));
console.log(update(obj.children, element, "delete"));

// console.log(obj.children["id1"].children["id3"].children["id4"]);
console.log(obj);
