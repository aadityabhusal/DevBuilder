const createSite = (req, res, next) => {
  try {
    res.send("Post Site Successful");
  } catch (error) {
    return next(error);
  }
};

const getSite = (req, res, next) => {
  try {
    res.send("Get Site Successful");
  } catch (error) {
    return next(error);
  }
};

const updateSite = (req, res, next) => {
  try {
    res.send("Put Site Successful");
  } catch (error) {
    return next(error);
  }
};

const deleteSite = (req, res, next) => {
  try {
    res.send("Delete Site Successful");
  } catch (error) {
    return next(error);
  }
};

module.exports = { createSite, getSite, updateSite, deleteSite };
