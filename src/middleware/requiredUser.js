const jsonwebtoken = require("jsonwebtoken");

async function requiredUser(req, res, next) {
  const token = req.cookies.accessToken;
  try {
    const payload = jsonwebtoken.verify(token, process.env.JWT_PASS).toString();
    res.locals.user = payload;
  } catch (error) {
    res.status(406).json({ message: "User must be logged in" });
  }
  next();
}

module.exports = requiredUser;
