const express = require("express");
const commentController = require("../controllers/comment_controller");

const router = express.Router();

// create a new comment
router.post("/", commentController.createComment);
// fetch the comments history
router.get("/", commentController.getComments);
// handle reaction to a comment
router.put("/reaction", commentController.reactComment);

module.exports = router;
