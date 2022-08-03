const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    body: { type: String },
    image_url: { type: String },
    user_id: { type: String, Required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
