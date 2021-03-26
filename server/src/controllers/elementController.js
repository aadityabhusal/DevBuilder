const createElement = (req, res, next) => {
  try {
    res.send("Post Element Successful");
  } catch (error) {
    return next(error);
  }
};

const getElement = (req, res, next) => {
  try {
    res.send("Get Element Successful");
  } catch (error) {
    return next(error);
  }
};

const updateElement = (req, res, next) => {
  try {
    res.send("Put Element Successful");
  } catch (error) {
    return next(error);
  }
};

const deleteElement = (req, res, next) => {
  try {
    res.send("Delete Element Successful");
  } catch (error) {
    return next(error);
  }
};

module.exports = { createElement, getElement, updateElement, deleteElement };
