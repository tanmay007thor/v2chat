const Users = require("../model/userModal");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({ message: "user is unauthoized !", status: false });
}
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next()
  } catch (e) {
    res.status(500).json({ message: "Server Error !", status: false });

  }
};
module.exports = auth