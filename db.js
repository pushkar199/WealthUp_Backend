const mongoose = require("mongoose");
require('dotenv').config()

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { dbConnection };
