const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

exports.isAuthenticated = async (req, res, next) => {
  try {
    console.log(req);
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Login First" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
