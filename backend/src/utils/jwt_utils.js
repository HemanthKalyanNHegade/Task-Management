const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token;
    jwt.verify(onlyToken, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.json({ message: "Token is not supplied.", statusCode: 401 });
  }
};

module.exports = { generateToken, validateToken };
