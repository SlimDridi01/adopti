const jwt = require("jsonwebtoken");
const userSchema = require("../models/authSchema");
exports.isAuth = async (req, res, next) => {
  const token = req.header("authorized");
  try {
    if (!token) {
      return res
        .status(400)
        .send({ errors: [{ msg: "you are not authorized" }] });
    }
    const decoded = jwt.verify(token, process.env.secretOrkey);
    const user = await userSchema.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send("server error");
  }
};
