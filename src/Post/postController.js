const express = require("express");
const cloudinary = require("cloudinary").v2;
const upload = require("../middleware/multer");
const requiredUser = require("../middleware/requiredUser");
const {
  createComment,
  findCommentByPostId,
} = require("../comment/commentService");
const Post = require("./postModel");

const { findOnePostByUserId, findAllPostByUserId } = require("./postService");
const { findOne } = require("./postModel");
require("dotenv").config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env["Cloudinary_name"],
  api_key: process.env["Cloudinary_api_key"],
  api_secret: process.env["Cloudinary_api_secret"],
});

async function saveImage(file) {
  try {
    return cloudinary.uploader.upload(file);
  } catch (e) {
    return e.message;
  }
}

router.post("/", upload.single("image"), requiredUser, async (req, res) => {
  const user = res.locals.user;
  const { content } = req.body;
  const up = await saveImage(req.file.path);
  const post = await Post.create({
    body: content,
    image_url: up.url,
    user_id: user.id,
  });
  res
    .status(201)
    .json({ message: "post created", statusCode: 201, data: post });
});

router.post("/:id", requiredUser, async (req, res) => {
  const user = res.locals.user;
  const comment = req.body;
  const data = await createComment(req.params.id, comment, user.id);
  res.status(201).json({ message: "comment made", statusCode: 201, data });
});

router.get("/feed", requiredUser, async (req, res) => {
  const user = res.locals.user;
  const posts = await findAllPostByUserId(user.id);
  res.status(200).json({ statusCode: 200, data: posts });
});

router.get("/:id", requiredUser, async (req, res) => {
  const post = await findOnePostByUserId(req.params.id);
  const comments = await findCommentByPostId(post.id);
  res.send({ post: post, comments: comments });
});

module.exports = router;
