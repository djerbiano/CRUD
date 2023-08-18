const express = require("express");
const controller = require("../controllers/posts");
const validate = require("../middlewares/validation/posts");
const route = express.Router();

route.get("/", controller.getAll);
route.get("/:id", validate.getOne, controller.getOne);
route.post("/", validate.addOne, controller.addOne);
route.delete("/:id", validate.deleteOne, controller.deletOne);
route.patch("/:id", validate.updateOne, controller.updateOne);

module.exports = route;
