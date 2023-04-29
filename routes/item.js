const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item");

router.get("/get-all-items",itemController.getAllItems);
router.post("/add-item",itemController.addItem);
router.post("/rent-item",itemController.rentItem);
router.post("/return-item",itemController.returnItem);
router.delete("/delete-item",itemController.deleteItem);

module.exports = router;