const createPage = (req, res, next) => {
  try {
    res.send("Post Page Successful");
  } catch (error) {
    return next(error);
  }
};

const getPage = (req, res, next) => {
  try {
    res.send("Get Page Successful");
  } catch (error) {
    return next(error);
  }
};

const updatePage = (req, res, next) => {
  try {
    res.send("Put Page Successful");
  } catch (error) {
    return next(error);
  }
};

const deletePage = (req, res, next) => {
  try {
    res.send("Delete Page Successful");
  } catch (error) {
    return next(error);
  }
};

module.exports = { createPage, getPage, updatePage, deletePage };
