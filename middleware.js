const jwt = require("jsonwebtoken");

//authen
const PRIVATE_KEY = "qkqkjfbqkfbwqeqweqwewqeqwwqqjfbqwkfq";
const generateToken = (data) => {
  return jwt.sign(JSON.parse(JSON.stringify(data)), PRIVATE_KEY, {
    algorithm: "HS256",
  });
};
const verifyUser = (req, res, next) => {
  if (!req?.headers?.authorization) {
    res.status(401).json({
      message: "unathorization",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, PRIVATE_KEY);
  req.user = decoded;
  next();
};

module.exports = { verifyUser, generateToken };
