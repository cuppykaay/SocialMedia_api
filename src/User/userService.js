const User = require("./userModel");

async function findUserByEmail(email) {
  return User.findOne({ email: email });
}

async function findUserByUsername(username) {
  return User.findOne({ username: username });
}

async function createUser(fullname, username, phonenumber, email, password) {
  return User.create({ fullname, username, phonenumber, email, password });
}

module.exports = { findUserByEmail, createUser, findUserByUsername };
