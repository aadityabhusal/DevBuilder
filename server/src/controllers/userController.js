const createUser = (req, res, next) => {
  try {
    res.send("Post User Successful");
  } catch (error) {
    return next(error);
  }
};

const getUser = (req, res, next) => {
  try {
    res.send("Get User Successful");
  } catch (error) {
    return next(error);
  }
};

const updateUser = (req, res, next) => {
  try {
    res.send("Put User Successful");
  } catch (error) {
    return next(error);
  }
};

const deleteUser = (req, res, next) => {
  try {
    res.send("Delete User Successful");
  } catch (error) {
    return next(error);
  }
};

module.exports = { createUser, getUser, updateUser, deleteUser };
