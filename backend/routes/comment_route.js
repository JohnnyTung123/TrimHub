const express = require("express");
const commentController = require("../controllers/comment_controller");

const router = express.Router();

// create a new comment
router.post("/", commentController.createComment);
// fetch the comments history
router.get("/", commentController.getComments);
// handle likes, dislikes
router.put("/like", commentController.likeComment);
router.put("/dislike", commentController.dislikeComment);

module.exports = router;
