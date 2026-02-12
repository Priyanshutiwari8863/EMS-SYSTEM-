const jwt = require("jsonwebtoken");

const auth = (role = null) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "No token" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      // role-based check (optional)
      if (role && decoded.role !== role) {
        return res.status(403).json({
          message: "Access denied"
        });
      }

      next();
    } catch (err) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }
  };
};

module.exports = auth;
