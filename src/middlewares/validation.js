const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const userLoginValidation = async (req, res, next) => {
  const { loginToken } = req.cookies;
  console.log(loginToken);
  try {
    const user = await jwt.verify(loginToken, "secretKey");
      if (!user) {
        throw new Error("Invalid Token");
      }
      const userDetails = await User.findById(user._id);
      if (!userDetails) {
        throw new Error("User Not Found");
      }
      req.user = userDetails;
      next();
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Invalid Token",
    });
  }
};

module.exports = userLoginValidation;
