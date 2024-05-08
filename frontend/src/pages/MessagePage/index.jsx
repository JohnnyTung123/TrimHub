import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useUser } from "../../context/UserContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const socket = io(API_URL);

const ChatList = () => {
  const { user } = useUser();
  const [chats, setChats] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`${API_URL}/chat/${user._id}`);
        if (!response.ok) {
          throw new Error("Error fetching user chat");
        }
        const chats = await response.json();
        console.log(chats);
        setChats(chats);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChats();
  }, [user]);

  const determineChatName = (chat) => {
    return chat.users[0]?._id === user?._id
      ? chat.users[1].username
      : chat.users[0].username;
  };

  return (
    <div className="min-h-screen w-64 bg-neutral-100">
      {chats.map((chat) => (
        <button
          key={chat._id}
          className={`${
            searchParams.get("chatId") === chat._id
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          } w-full mx-0 py-4 text-center text-xl border rounded-xl cursor-pointer`}
          onClick={() => setSearchParams({ chatId: chat._id })}
        >
          {determineChatName(chat)}
        </button>
      ))}
    </div>
  );
};

const Chat = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${API_URL}/message/${searchParams.get("chatId")}`
        );
        if (!response.ok) {
          throw new Error("Error fetching salon info");
        }
        const messages = await response.json();
        console.log(messages);
        setMessages(messages);

        socket.emit("join chat", searchParams.get("chatId"));
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [searchParams]);

  const createNewMessage = async (e) => {
    e.preventDefault();
    if (!newMessage) {
      alert("Please enter some messages.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: searchParams.get("chatId"),
          senderId: user._id,
          content: newMessage,
        }),
      });
      if (!response.ok) {
        throw new Error("Error creating messages");
      }
      const message = await response.json();
      setNewMessage("");

      socket.emit("message", message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMessageUpdate = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-200">
      <div class="flex-grow mx-2">
        {messages.map((message, index) => {
          const isSender = user._id === message.sender._id;
          const date = new Date(message.createdAt);
          const dateLast =
            index !== 0 ? new Date(messages[index - 1].createdAt) : null;
          const dateChanged = dateLast
            ? date.getDate() !== dateLast.getDate()
            : true;

          return (
            <>
              {dateChanged && (
                <div className="text-center">{date.toLocaleDateString()}</div>
              )}
              <div
                key={message._id}
                className={`flex ${
                  isSender ? "flex-row-reverse" : "flex-row"
                } my-2`}
              >
                <div className="rounded-xl border border-green-700 bg-opacity-80">
                  <div className="px-2 font-bold">
                    {message.sender.username}
                  </div>
                  <div className="px-2">{message.content}</div>
                  <div
                    className={`${
                      isSender ? "text-right" : "text-left"
                    } mt-1 px-2 text-xs`}
                  >
                    {date.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      {searchParams.get("chatId") && (
        <div className="flex flex-col items-center justify-between mb-4">
          <form onSubmit={createNewMessage}>
            <input
              type="text"
              value={newMessage}
              placeholder="Enter your messages here"
              onChange={handleMessageUpdate}
              className="text-lg border border-gray-300 rounded mr-2 p-2"
            />
            <button type="submit" class="bg-green-700 text-white">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const MessagePage = () => {
  return (
    <div className="flex justify-between">
      <ChatList />
      <Chat />
    </div>
  );
};

export default MessagePage;
