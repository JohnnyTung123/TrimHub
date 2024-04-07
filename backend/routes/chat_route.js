const express = require("express");
const chatController = require("../controllers/chat_controller");

const router = express.Router();

router.post("/", chatController.accessChat);
router.get("/:userId", chatController.getChats);

module.exports = router;
