const register = async (req, res, next) => {
  try {
    res.send({ message: "Register Route" });
  } catch (error) {
    return next(error);
  }
};
const login = async (req, res, next) => {
  try {
    res.send({ message: "Login Route" });
  } catch (error) {
    return next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    res.send({ message: "Logout Route" });
  } catch (error) {
    return next(error);
  }
};
const refreshToken = async (req, res, next) => {
  try {
    res.send({ message: "Refresh Token Route" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
