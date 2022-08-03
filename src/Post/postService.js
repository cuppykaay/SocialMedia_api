const Post = require("./postModel");

async function createPost(body, image_url) {
  return Post.create({ body: body, image_url: image_url });
}
async function findOnePostByUserId(id) {
  return Post.findOne({ user_id: id });
}
async function findAllPostByUserId(id) {
  return Post.find({ user_id: id });
}

module.exports = { findOnePostByUserId, createPost, findAllPostByUserId };
