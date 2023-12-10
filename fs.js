const { log } = require("console");
var fs = require("fs");
var path = require("path");
const database = path.join(__dirname, "./database.json");

const readF = async () => {
  const data = await fs.promises.readFile(database, "utf-8");
  return JSON.parse(data);
};

const writeF = (data) => {
  return fs.promises.writeFile(database, JSON.stringify(daa, 4, null), "utf-8");
};

const createUser = async (userinput) => {
  const oldData = await readF();
  const newData = [userinput, ...oldData];
  await writeF(newData);
};

const updateUser = async (idUser, updateInfo) => {
  const oldData = await readF();
  const newData = oldData.map((user) => {
    if (user.id == idUser) {
      return { ...user, ...updateInfo };
    }
    return user;
  });
  await writeF(newData);
};

const replaceUser = async (idUser, updateInfo) => {
  const oldData = await readF();
  const newData = oldData.map((user) => {
    if (idUser === user.id) {
      return { ...updateInfo, id: idUser };
    }
    return user;
  });
  await writeF(newData);
};

const deleteF = async (idDelete) => {
  const oldData = await readF();
  const newData = oldData.filter((user) => {
    return user.id !== parseInt(idDelete, 10);
  });
  await writeF(newData);
};

const userLogin = async (userName, password) => {
  const oldData = await readF();
  // const newData = oldData.find((user) => {
  //   if (user.name === userName && user.pass === password) {
  //     return user;
  //   }
  //   throw new Error("user not found");
  // });
  // return newData;
  const user = oldData.find(
    (user) => user.name === userName && user.pass === password
  );
  if (user) {
    return user;
  }
  return null;
};

const main = async () => {};

main();

module.exports = {
  readF,
  writeF,
  createUser,
  updateUser,
  deleteF,
  replaceUser,
  userLogin,
};
