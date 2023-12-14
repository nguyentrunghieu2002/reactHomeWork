const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: String,
    password: String,
    name: {
      type: String,
      required: true, // bắt buộc phải có
      unique: true, // không được trùng
    }, // key: type value
    age: Number,
    email: String,
    password: String,
    role: {
      type: String,
      default: "user",
    },
    avatar: String,
  },
  {
    timestamps: true,
    // collection: 'users',
  }
);

const User = mongoose.model("User", userSchema);

const readAll = async (filter = {}) => {
  const user = await User.find(filter).lean();
  return user;
};

const userLogin2 = async (userName, password) => {
  try {
    //Tìm một người dùng với tên người dùng
    const user = await User.findOne({ userName });
    // console.log(user);
    // Kiểm tra xem người dùng có tồn tại không
    if (user) {
      // Kiểm tra mật khẩu trực tiếp
      if (user.password == password) {
        // Nếu mật khẩu hợp lệ, trả về người dùng
        return user;
      }
    }

    // Nếu không tìm thấy người dùng hoặc mật khẩu không hợp lệ, trả về null
    return null;
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createUser2 = async (data) => {
  const user = await User.create(data);
  return user;
};
const updateUser2 = async (id, data) => {
  const user = await User.updateOne({ _id: id }, data);
  return user;
};
const deleteUser = async (id) => {
  const user = await User.deleteOne({ _id: id });
  return user;
};

const getUserById = (id) => {
  return User.findById(id);
};

const login = async (userName, password) => {
  return await User.findOne({
    userName,
    password,
  }).lean();
};

module.exports = {
  readAll,
  createUser2,
  updateUser2,
  deleteUser,
  userLogin2,
  getUserById,
  login,
};
