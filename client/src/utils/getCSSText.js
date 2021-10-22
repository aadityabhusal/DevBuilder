export function getCSSText(styleBlocks) {
  let result = styleBlocks.map((block) => {
    let list = block.style.map((item) => {
      return `${item.name}:${item.value};`;
    });
    return `${block.selector}{${list.join("")}}`;
  });
  return result.join("");
}
