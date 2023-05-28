const { Router } = require('express');

const taskController = require('../controllers/task.js');

const taskRouter = Router();

taskRouter.get("/", taskController.index);
taskRouter.get("/:id", taskController.show);
taskRouter.post("/", taskController.create);
taskRouter.patch("/:id", taskController.update);
taskRouter.delete("/:id", taskController.destroy);

module.exports = taskRouter;
