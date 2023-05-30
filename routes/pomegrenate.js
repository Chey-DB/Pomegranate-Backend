const { Router } = require('express');

const pomegrenateController = require('../controllers/pomegrenate.js');

const pomegrenateRouter = Router();

pomegrenateRouter.get("/", pomegrenateController.index);
pomegrenateRouter.get("/:id", pomegrenateController.show);
pomegrenateRouter.post("/", pomegrenateController.create);
pomegrenateRouter.patch("/:id", pomegrenateController.update);
pomegrenateRouter.delete("/:id", pomegrenateController.destroy);

module.exports = pomegrenateRouter;
