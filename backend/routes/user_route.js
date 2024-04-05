const express = require("express");
const userController = require("../controllers/user_controller");

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
