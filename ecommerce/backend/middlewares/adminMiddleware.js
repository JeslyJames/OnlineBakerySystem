const adminMiddleware = (req, res, next) => {
  // Check if the authenticated user has the Admin role
  if (req.user.role !== "Admin") {
    return res
      .status(403)
      .json({ success: false, message: "Access denied. Admins only." });
  }
  next(); // Pass control to the route handler if the user is an Admin
};

module.exports = { adminMiddleware }