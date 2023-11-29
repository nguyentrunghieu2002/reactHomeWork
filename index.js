const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
cors(app);
app.get("/wiki/:userId", (req, res) => {
  const query = req.query;
  const params = req.params;
  console.log(params);
  console.log(query);
  res.send("hello");
});
app.post("/user", (req, res) => {
  const body = req.body;
  console.log(body);
  res.json(body);
});
app.put;
app.patch;
app.delete;

app.listen(3000, () => {
  console.log(`Example app listening on ports:sad ${3000}`);
});
