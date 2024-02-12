// connect mongoose to the database and export the connection

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/task-management", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Connection error", error);
  }
};

module.exports = connectDB;
