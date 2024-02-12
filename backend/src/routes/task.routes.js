const tasksRouter = require("express").Router();

const {
  insertTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const { validateToken } = require("../utils/jwt_utils");

tasksRouter.post("/", validateToken, insertTask);
tasksRouter.get("/", validateToken, getTasks);
tasksRouter.put("/update", validateToken, updateTask);
tasksRouter.delete("/delete/:id", validateToken, deleteTask);

module.exports = tasksRouter;
