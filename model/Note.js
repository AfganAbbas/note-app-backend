const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("Note", noteSchema);
