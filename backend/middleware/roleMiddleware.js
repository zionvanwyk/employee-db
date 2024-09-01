const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming the user's role is stored in req.user by the auth middleware
    if (userRole !== requiredRole) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = roleMiddleware;
