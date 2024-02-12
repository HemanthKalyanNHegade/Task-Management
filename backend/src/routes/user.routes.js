const userRouter = require("express").Router();

const { addNewUser, loginUser } = require("../controllers/user.controller");

userRouter.post("/register", addNewUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
