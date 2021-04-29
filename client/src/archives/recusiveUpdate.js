let obj = {
  _id: 0,
  children: {
    id1: {
      _id: "id1",
      value: "First",
      children: {
        id2: {
          _id: "id2",
          value: "Second",
          children: {},
        },
        id3: {
          _id: "id3",
          value: "Third",
          children: {
            id4: {
              _id: "id4",
              value: "Fourth",
              children: {},
            },
          },
        },
      },
    },
  },
};

let path = ["id1", "id3"];
let element = {
  _id: "id4",
  value: "Changed",
  children: {},
};

function update(site, element, path, action = "", level = 0) {
  if (level === path.length - 1) {
    let lastItem = path[path.length - 1];
    if (site.hasOwnProperty(lastItem)) {
      action === "delete"
        ? delete site[lastItem].children[element._id]
        : (site[lastItem].children[element._id] = element);
    }
    return;
  } else {
    update(site[path[level]].children, element, path, action, ++level);
  }
}

console.log(obj.children["id1"].children["id3"].children["id4"]);

console.log(update(obj.children, element, path, "delete"));

console.log(obj.children["id1"].children["id3"].children["id4"]);
