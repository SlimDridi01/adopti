const mongoose = require("mongoose");
require("dotenv").config();

//importing and connect uri from.env
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
