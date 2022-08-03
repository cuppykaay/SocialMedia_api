const Comment = require("./commentModel");

async function createComment(id, comment, user_id) {
  return Comment.create({
    post_id: id,
    comment: comment,
    commenter_id: user_id,
  });
}

async function findCommentByPostId(id) {
  return Comment.find({ post_id: id });
}

module.exports = { createComment, findCommentByPostId };
