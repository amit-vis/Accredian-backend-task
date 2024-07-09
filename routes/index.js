const express = require("express");
const router = express.Router();
const referalController = require("../controller/referal_controller");

router.post("/create-referal", referalController.create);

module.exports = router;