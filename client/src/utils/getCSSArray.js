export function getCSSArray(styleText) {
  try {
    let results = [];
    styleText
      .replace(/[\n\r]+/g, "")
      .split(";")
      .forEach((item) => {
        if (item) {
          let prop = item.split(":");
          results.push([prop[0].trim(), prop[1].trim()]);
        }
      });
    return results;
  } catch (error) {
    return null;
  }
}
