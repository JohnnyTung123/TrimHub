const express = require("express");
const messageController = require("../controllers/message_controller");

const router = express.Router();

router.post("/", messageController.createMessage);
router.get("/:chatId", messageController.getMessages);

module.exports = router;
