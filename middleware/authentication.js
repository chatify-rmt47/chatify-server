const jwt = require("jsonwebtoken");
const User = require("../model/user");

async function authentication(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) throw { name: "invalidToken" };
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) throw { name: "invalidToken" };
    const user = await User.findById(payload.userId).select("-password");
    if (!user) throw { name: "invalidToken" };
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
