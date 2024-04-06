const Comment = require("../models/comment");
const path = require("path");

const createComment = async (req, res) => {
  const { username, content, salonId } = req.body;
  console.log("Create Comment:", username, content, salonId);

  try {
    const comment = await Comment.create({ username, content, salonId });
    console.log("Create Comment:", comment);
    res.status(201).json({ success: "Comment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getComments = async (req, res) => {
  const { salonId } = req.query;

  try {
    const comments = await Comment.find({ salonId }).sort({ date: -1 });
    console.log("Got Comments:", comments);
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const likeComment = async (req, res) => {
  const { commentId } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    comment.likes++;
    await comment.save();
    console.log("Liked Comment:", comment);
    res.status(200).json({ success: "Comment liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const dislikeComment = async (req, res) => {
  const { commentId } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    comment.dislikes++;
    await comment.save();
    console.log("Disliked Comment:", comment);
    res.status(200).json({ success: "Comment disliked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

module.exports = {
  createComment,
  getComments,
  likeComment,
  dislikeComment,
};
