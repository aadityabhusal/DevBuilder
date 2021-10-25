export function nestingValidation(parentTag, childTag, nonClosingTags) {
  let tags = {
    p: ["p"],
    li: ["li"],
    a: ["a"],
    button: ["button"],
  };
  let parent = parentTag.toLowerCase();

  if (nonClosingTags.includes(parent)) {
    return false;
  }

  if (tags.hasOwnProperty(parent) && tags[parent].includes(childTag)) {
    return false;
  }
  return true;
}
