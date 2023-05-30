const { Router } = require('express');

const userController = require("../controllers/user")

const userRouter = Router();

//user routes
userRouter.get("/logout", userController.logout);
userRouter.get("/profile/:username", userController.profile)
userRouter.get("/leaderboard", userController.leaderboard)
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

//task routes
userRouter.get("/profile/:username/:index", userController.getTask)
userRouter.post("/profile/:username/:index", userController.addTask)
userRouter.patch("/profile/:username/:index", userController.updateTask)
userRouter.delete("/profile/:username/:index", userController.deleteTask)


