const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt_utils");

const addNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  let hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    const user = await newUser.save();
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user),
      statusCode: 201,
    });
  } catch (error) {
    console.error("New User: ", error);
    res.json({ message: "Failed to register new user!", statusCode: 400 });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user),
        statusCode: 200,
      });
      return;
    }
  }
  res.json({ message: "Invalid email or password!", statusCode: 401 });
};

module.exports = { addNewUser, loginUser };
