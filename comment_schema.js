const mongoose = require("mongoose");
const { getUserById } = require("./user_schema.js");

const commentSchema = new mongoose.Schema(
  {
    content: String,
    author: {
      type: mongoose.ObjectId,
      ref: "User",
    },

    tags: {
      type: [String],
      default: ["student", "good"],
    },
    likes: [
      {
        type: mongoose.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    // collection: 'users',
  }
);

const Comment = mongoose.model("Comment", commentSchema);

const readAllCom = async (filter = {}) => {
  const data = await Comment.find(filter, "author content").populate(
    "author",
    "name age email"
  );
  return data;
};

const create = async (data) => {
  const { author, ...restData } = data;

  const dataSave = {
    ...restData,
    author: new mongoose.Types.ObjectId(author),
  };
  const data1 = await Comment.create(dataSave);
  console.log(data1);
  return data1;
};

const createUserModel = async (data) => {
  const { author, ...restData } = data;
  const userFound = await getUserById(author);
  const dataSave = {
    ...restData,
    author: userFound,
  };
  const data1 = await Comment.create(dataSave);
  return data1;
};

const update = async (id, data) => {
  const data1 = await Comment.updateOne({ _id: id }, data);
  return data1;
};

const remove = async (id) => {
  const data = await Comment.deleteOne({ _id: id });
  return data;
};

module.exports = {
  readAllCom,
  create,
  update,
  remove,
  createUserModel,
};
