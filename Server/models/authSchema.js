const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Phone: { type: Number, required: true },
  role: { type: String, enum: ["User", "Admin"], default: "User" },
});
module.exports = mongoose.model("user", authSchema);
