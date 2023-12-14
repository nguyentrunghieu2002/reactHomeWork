const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { verifyUser, generateToken } = require("./middleware.js");

// import luong restful co ban
const {
  readF,
  writeF,
  createUser,
  updateUser,
  deleteF,
  replaceUser,
  userLogin,
} = require("./fs.js");
//import luong restfull voi schema
const {
  readAll,
  createUser2,
  deleteUser,
  updateUser2,
  userLogin2,
} = require("./user_schema.js");

//
// restful
userRouter.get("/", async (req, res) => {
  const query = req.query;
  const params = req.params;
  // const nameRex = new RegExp(query.name, "i");
  // const data = await readAll({
  //   nameRex,
  // });
  const data = await readAll({});
  res.json(data);
});

//lay user theo ten
// userRouter.get("/user", async (req, res) => {
//   const query = req.query;
//   console.log(query);
//   const data = await readF();
//   const newData = data.filter(
//     (user) => user.name.toLowerCase() === query.name.toLowerCase()
//   );
//   res.json(newData);
// });

//lay user theo tuoi
// userRouter.get("/user", async (req, res) => {
//   const query = req.query;
//   const userAge = parseInt(query.age, 10);
//   const data = await readF();
//   const newData = data.filter((user) => user.age === userAge);
//   res.json(newData);
// });

//tao moi 1 user
userRouter.post("/", async (req, res) => {
  const body = req.body;
  await createUser2(body);
  console.log(body);
  res.json({
    message: "create user success",
  });
});

//update user theo id
userRouter.patch("/:userId", verifyUser, async (req, res) => {
  const body = req.body;
  const { userId } = req.params;

  await updateUser2(userId, body);
  res.json({
    message: "update user success",
  });
});

// xoa user
userRouter.delete("/", verifyUser, async (req, res) => {
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

userRouter.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await userLogin2(userName, password);
    //
    console.log(user);
    var token = generateToken(user);
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

// userRouter.patch("/user/:userId", async (req, res) => {
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

userRouter.patch("/", verifyUser, async (req, res) => {
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

userRouter.post("/register", async (req, res) => {
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

module.exports = userRouter;
