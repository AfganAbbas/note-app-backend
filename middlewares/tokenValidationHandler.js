const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  const authToken = req.headers.Authorization || req.headers.authorization;
  if (authToken || authToken.startsWith("token")) {
    const token = authToken.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      console.log(err);
      if (err) {
        res.status(401).json({ errorMessage: "User not authorized!" });
      }
      req.user = decoded.id;
      next();
    });
  } else {
    res.status(401).json({ errorMessage: "Token is missing!" });
  }
};

module.exports = validateToken;
