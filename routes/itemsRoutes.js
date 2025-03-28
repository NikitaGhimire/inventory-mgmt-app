const express = require("express");
const itemRouter = express.Router();
const itemController = require('../controllers/itemsController');

// Routes
itemRouter.get("/", itemController.getAllItems);
itemRouter.get("/new", itemController.showNewItemForm);
itemRouter.post("/new", itemController.createItem);
itemRouter.get("/:id/edit", itemController.showEditItemForm);
itemRouter.post("/:id/edit", itemController.updateItem);
itemRouter.post("/:id/delete", itemController.deleteItem);

module.exports = itemRouter;
