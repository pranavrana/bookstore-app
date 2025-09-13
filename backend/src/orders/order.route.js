const express = require("express");
const { createAOrder, getOrdersByEmail } = require("./order.controller");
const router = express.Router();

//create order endpoint
router.post("/", createAOrder)

//get orders endpoint
router.get("/email/:email", getOrdersByEmail)
module.exports = router;
