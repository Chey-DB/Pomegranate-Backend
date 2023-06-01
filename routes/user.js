const { Router } = require('express');
const authenticator = require("../middleware/authenticator")

const userController = require("../controllers/user")

const userRouter = Router();

//user routes
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:username", userController.showUser);
userRouter.delete("/:username", userController.logout);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

// task routes
userRouter.post("/:username/tasks", authenticator, userController.addTask)
userRouter.patch("/:username/tasks/:index", authenticator, userController.updateTask)
userRouter.delete("/:username/tasks/:index", authenticator, userController.deleteTask)

// pomodoro routes
userRouter.patch("/:username/pomodoro", authenticator, userController.updatePomodoroCount)

module.exports = userRouter
