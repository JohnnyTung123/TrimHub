const jwt = require("jsonwebtoken");

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).send({ error: "Token required." });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("Invaild token");
      return res.status(403).send({ error: "Invalid token." });
    }

    req.user = user.user;
    next();
  });
};

module.exports = { authenticateToken };
