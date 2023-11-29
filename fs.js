var fs = require("fs");
var path = require("path");
const database = path.join(__dirname, "./database.json");

const readF = async () => {
  const data = await fs.promises.readFile(database, "utf-8");
  return JSON.parse(data);
};

const writeF = (data) => {
  return fs.promises.writeFile(
    database,
    JSON.stringify(data, 4, null),
    "utf-8"
  );
};

const createUser = async (userinput) => {
  const oldData = await readF();
  const newData = [userinput, ...oldData];
  await writeF(newData);
};

const updateUser = async (idUser, updateInfo) => {
  const oldData = await readF();
  const newData = oldData.map((user) => {
    if (idUser === user.id) {
      return { ...user, ...updateInfo };
    }
    return user;
  });
  await writeF(newData);
};

const deleteF = async (idDelete) => {
  const oldData = await readF();
  const newData = oldData.filter((user) => {
    return user.id !== idDelete;
  });
  await writeF(newData);
};

const main = async () => {
  await deleteF(3);
};

main();
