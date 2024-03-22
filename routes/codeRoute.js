
const express = require("express");
const codeController = require("../controllers/codeController");

const router = express.Router();

router.get("/", codeController.generateCode);
router.post("/use", codeController.useCode);

module.exports = router;
