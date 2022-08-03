const express = require("express");
const bcrypt = require("bcrypt");
const {
  findUserByEmail,
  createUser,
  findUserByUsername,
} = require("./userService");

const jsonwebtoken = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { fullname, username, phonenumber, email, password } = req.body;
  const userByemail = await findUserByEmail(email);
  const userByusername = await findUserByUsername(username);
  if (userByemail && userByusername) {
    res.json({ message: "user with this email or username exits" });
  } else {
    let salt = await bcrypt.genSalt(10);
    const hashedpw = await bcrypt.hash(password, salt);
    await createUser(fullname, username, phonenumber, email, hashedpw);
    res.json({message: "Account Created" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    if (bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
      };
      const token = jsonwebtoken.sign(payload, "secret"); // sign token
      res.cookie("accessToken", token);
      res.json({user});
    } else {
      res.json({ message: "password incorrect" });
    }
  } else {
    res.json({ message: "user does not exist" });
  }
});

module.exports = router;
