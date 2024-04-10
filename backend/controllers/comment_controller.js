const Comment = require("../models/comment");
const path = require("path");

const createComment = async (req, res) => {
  const { username, content, salonId } = req.body;
  console.log("Create Comment:", username, content, salonId);

  try {
    const comment = await Comment.create({ username, content, salonId });
    console.log("Create Comment:", comment);
    res.status(201).json({ success: "Comment created successfully", comment });
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

const reactComment = async (req, res) => {
  const { commentId, username, response } = req.body;
  console.log("React Comment:", commentId, username, response);

  // check if the user has already reacted to the comment
  const comment = await Comment.findById(commentId);
  const reaction = comment.reaction.find(
    (reaction) => reaction.username === username
  );
  if (reaction) {
    // if the user has already reacted, update the response
    reaction.response = response;
  } else {
    // if the user has not reacted, add a new reaction
    comment.reaction.push({ username, response });
  }
  try {
    const updatedComment = await comment.save();
    console.log("React Comment:", updatedComment);
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

module.exports = {
  createComment,
  getComments,
  reactComment,
};
