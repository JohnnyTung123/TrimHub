const Message = require("../models/message");

const createMessage = async (req, res) => {
  const { chatId, senderId, content } = req.body;

  if (!chatId || !senderId || !content) {
    console.log("Receive empty data");
    return res.status(400).json({ error: "Receive empty data" });
  }

  try {
    const message = await Message.create({
      chat: chatId,
      sender: senderId,
      content: content,
    });

    await message.populate({
      path: "chat",
      populate: { path: "users" },
    });
    await message.populate("sender");

    console.log("Created Message:", message);
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chat: chatId })
      .populate({
        path: "chat",
        populate: { path: "users" },
      })
      .populate("sender");
    console.log("Got Messages:", messages);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

module.exports = { createMessage, getMessages };
