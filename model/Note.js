const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("Note", noteSchema);
