export function getStylePropertyName(name) {
  let update = name
    .split("-")
    .map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    })
    .join("");
  return name[0] + update.slice(1);
}
