const Chat = require("../models/chat");

const accessChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    console.log("Receive empty data");
    return res.status(400).json({ error: "Receive empty data" });
  }

  try {
    const chat = await Chat.findOneAndUpdate(
      {
        $and: [
          { users: { $elemMatch: { $eq: senderId } } },
          { users: { $elemMatch: { $eq: receiverId } } },
        ],
      },
      {
        $setOnInsert: {
          users: [senderId, receiverId],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        timestamps: false,
        upsert: true,
        new: true,
      },
    );
    console.log("Created Chat:", chat);
    res.status(201).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getChats = async (req, res) => {
  const { userId } = req.params;

  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: userId } },
    }).populate("users");
    console.log("Got Chats:", chats);
    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

module.exports = { accessChat, getChats };
