const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");
const { isNumber } = require("lodash");
const { login } = require("./user_schema.js");

// bo router
const commentRouter = require("./commentRouter.js");
const userRouter = require("./userRouter.js");
//DB connect
const { connect } = require("./mongodb_connect.js");
const { generateToken } = require("./middleware.js");
connect();
// config cors
cors(app);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/comment", commentRouter);
app.use("/user", userRouter);

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await login(userName, password);
  if (user) {
    const token = generateToken(user);
    return res.json({
      data: user,
      token: token,
    });
  } else {
    res.status(400).json({ message: "login fail" });
  }
});

app.listen(3000, () => {
  console.log(`Example app listening on ports: ${3000}`);
});
