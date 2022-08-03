const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    post_id: { type: String },
    comment: { type: String },
    commenter_id: { type: String },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
