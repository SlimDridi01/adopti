const mongoose = require("mongoose");

const PetsSchema = new mongoose.Schema({
  Title: { type: String, require: true },
  Description: { type: String, require: true },
  Image: [{ type: String }],
  CreatedBy: {
    Name: { type: String, required: true },
    Id: { type: mongoose.Schema.Types.ObjectId },
    Phone: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Pets", PetsSchema);
