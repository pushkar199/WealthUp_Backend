
const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  value: { type: String, unique: true },
  expiration: { type: Date, default: Date.now, expires: 60000 }, // Expires after 60 seconds
  used: { type: Boolean, default: false },
});

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;
