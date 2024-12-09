const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, "secret_ecom");
    req.user = verified.user; // Attach user data to request
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = { authMiddleware }
