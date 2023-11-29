const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { readF, writeF, createUser, updateUser, deleteF } = require("./fs.js");
const { isNumber } = require("lodash");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
cors(app);
// app.get("/user", async (req, res) => {
//   const query = req.query;
//   const params = req.params;
//   console.log(params);
//   console.log(query);

//   const data = await readF();
//   res.json(data);
// });

// app.get("/user", async (req, res) => {
//   const query = req.query;
//   console.log(query);
//   const data = await readF();
//   const newData = data.filter(
//     (user) => user.name.toLowerCase() === query.name.toLowerCase()
//   );
//   res.json(newData);
// });

app.get("/user", async (req, res) => {
  const query = req.query;
  const userAge = parseInt(query.age, 10);
  const data = await readF();
  const newData = data.filter((user) => user.age === userAge);
  res.json(newData);
});

app.post("/user", async (req, res) => {
  const body = req.body;
  await createUser(body);
  console.log(body);
  res.json({
    message: "create user success",
  });
});

app.put("/user/:userId", async (req, res) => {
  const body = req.body;
  console.log(body);

  const params = req.params;
  const userId = parseInt(params.userId, 10); // Chuyển đổi userId sang kiểu number
  console.log(userId);

  await updateUser(userId, body);
  res.json({
    message: "update user success",
  });
});
app.patch;

app.delete("/user/:userId", async (req, res) => {
  const params = req.params;
  const userId = parseInt(params.userId, 10);
  await deleteF(userId);
  res.json({
    message: "delete user success",
  });
});

app.listen(3000, () => {
  console.log(`Example app listening on ports:sad ${3000}`);
});
