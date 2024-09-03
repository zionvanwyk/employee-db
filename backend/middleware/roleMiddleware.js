function roleMiddleware(requiredRole = "manager") {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user information found" });
    }

    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient privileges" });
    }

    next();
  };
}

module.exports = roleMiddleware;
