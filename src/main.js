const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const post = require("./Post/postController");
const user = require("./User/userController");
const comment =  require("./comment/commentController");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", user);
app.use("/api/post", post);
app.use("/api/comment", comment)

async function databaseCon() {
  try {
    await mongoose.connect("mongodb://localhost:27017/socialmedia");
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
}

app.listen(5000, () => {
  console.log("server runing on port 5000");
  databaseCon();
});
