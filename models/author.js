const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_ame: { type: String, required: true },
  llast_name: { type: String, required: true },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

module.exports = mongoose.model("Author", AuthorSchema);
