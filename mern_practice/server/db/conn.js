const mongoose = require("mongoose");

const Connection = async () => {
  const DB = "mongodb://0.0.0.0:27017/my-crud";
  try {
    await mongoose.connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.warn({ congrats: "Database connected" });
  } catch (error) {
    console.warn({ error: "error while connecting to database" });
  }
};

module.exports = Connection;
