const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token Verification Error:', err);
    return res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = protect;
