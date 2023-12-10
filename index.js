const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  readF,
  writeF,
  createUser,
  updateUser,
  deleteF,
  replaceUser,
  userLogin,
} = require("./fs.js");
const { isNumber } = require("lodash");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const {
  readAll,
  createUser2,
  deleteUser,
  updateUser2,
  userLogin2,
} = require("./mongodb_schema.js");

const { connect } = require("./mongodb_connect.js");

connect();

const verifyUser = (req, res, next) => {
  if (!req?.headers?.authorization) {
    res.status(401).json({
      message: "unathorization",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, PRIVATE_KEY);
  req.user = decoded;
  console.log(decoded);
  next();
};

const PRIVATE_KEY = "qkqkjfbqkfbwqeqweqwewqeqwwqqjfbqwkfq";

// parse application/json
app.use(bodyParser.json());
cors(app);

app.get("/user", async (req, res) => {
  const query = req.query;
  const params = req.params;
  // const nameRex = new RegExp(query.name, "i");
  // const data = await readAll({
  //   nameRex,
  // });
  const data = await readAll();
  res.json(data);
});

//lay user theo ten
// app.get("/user", async (req, res) => {
//   const query = req.query;
//   console.log(query);
//   const data = await readF();
//   const newData = data.filter(
//     (user) => user.name.toLowerCase() === query.name.toLowerCase()
//   );
//   res.json(newData);
// });

//lay user theo tuoi
// app.get("/user", async (req, res) => {
//   const query = req.query;
//   const userAge = parseInt(query.age, 10);
//   const data = await readF();
//   const newData = data.filter((user) => user.age === userAge);
//   res.json(newData);
// });

//tao moi 1 user
app.post("/user", async (req, res) => {
  const body = req.body;
  await createUser2(body);
  console.log(body);
  res.json({
    message: "create user success",
  });
});

//update user theo id
app.patch("/user/:userId", verifyUser, async (req, res) => {
  const body = req.body;
  const { userId } = req.params;

  await updateUser2(userId, body);
  res.json({
    message: "update user success",
  });
});

// xoa user
app.delete("/user", verifyUser, async (req, res) => {
  // const params = req.params;
  // const userId = parseInt(params.userId, 10);
  // await deleteF(userId);
  // res.json({
  //   message: "delete user success",
  // });
  // const userId = req.user.id;
  const userId = req.user._id;

  console.log(typeof userId);
  deleteUser(userId);
  res.json({
    message: "delete user success",
  });
});

// login

app.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await userLogin2(userName, password);
    //
    console.log(user);
    var token = jwt.sign(JSON.parse(JSON.stringify(user)), PRIVATE_KEY, {
      algorithm: "HS256",
    });
    res.json({
      data: user,
      token: token,
      message: "login success",
    });
    console.log(token);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

// app.patch("/user/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const body = req.body;
//     await updateUser(userId, body);
//     res.status(300).json({
//       message: "replace user success",
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

app.patch("/user", verifyUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const body = req.body;
    await updateUser2(userId, body);
    res.status(300).json({
      message: "replace user success",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    const body = req.body;
    const user = await createUser2(body);
    res.json({
      message: "register success",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log(`Example app listening on ports: ${3000}`);
});
