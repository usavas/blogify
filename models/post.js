const mongoose = require("mongoose");
const { Schema } = mongoose;
// const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    date: { type: Date, default: Date.now },
    body: [{}],
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

PostSchema.virtual("postRoute").get(function () {
  return `/post/${this._id}`;
});

const post = mongoose.model("Post", PostSchema);
module.exports = post;
