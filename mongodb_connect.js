const mongoose = require("mongoose");

function connect() {
  const dnd = `mongodb+srv://nguyentrunghieu17102k2:hieu17102002@cluster0.aygls5l.mongodb.net/`;
  mongoose.connect(dnd, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connect mongodb database!");
  mongoose.connection.on("error", (error) =>
    console.log("error connect db", error)
  );
  mongoose.connection.once("open", () =>
    console.log(`Connect to saving DB successfully!!!`)
  );
}

module.exports = { connect };
