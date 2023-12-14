const { Router } = require("express");
const {
  readAllCom,
  create,
  update,
  remove,
  createUserModel,
} = require("./comment_schema.js");
const { verifyUser } = require("./middleware.js");

const commentRouter = Router();

commentRouter.get("/", async (req, res) => {
  const query = req.query;
  const data = await readAllCom(query);
  res.status(200).json(data);
});

commentRouter.post("/", verifyUser, async (req, res) => {
  const body = req.body;
  const user = req.user;
  const data = await createUserModel({
    ...body,
    author: user._id,
  });

  res.status(200).json(data);
});

commentRouter.patch("/:commentId", verifyUser, async (req, res) => {
  try {
    const { commentId } = req.params;
    const body = req.body;
    console.log(commentId, body);
    await update(commentId, body);
    res.status(300).json({
      message: "replace user success",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

commentRouter.delete("/:commentId", verifyUser, async (req, res) => {
  try {
    const { commentId } = req.params;
    await remove(commentId);
    res.json({
      message: "delete cmt success",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = commentRouter;
