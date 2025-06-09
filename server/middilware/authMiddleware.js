const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ error: "No token, authorization denied", code: "TOKEN_MISSING" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token Verification Error:", err);


    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Your session has expired. Please log in again.",
        code: "TOKEN_EXPIRED",
      });
    }

    return res.status(401).json({
      error: "Token is not valid",
      code: "TOKEN_INVALID",
    });
  }
};

module.exports = protect;
