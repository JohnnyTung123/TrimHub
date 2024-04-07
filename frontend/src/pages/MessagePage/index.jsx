import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

const ChatList = ({ currentChat, setCurrentChat }) => {
  const [user, setUser] = useState({_id: "660d3c2d5101acc17841f7e8"});
  const [chats, setChats] = useState([]);

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
    return chat.users[0]?._id === user?._id ? chat.users[1].username : chat.users[0].username;
  };

  return (
    <div className="flex min-h-screen w-64 bg-neutral-100">
      {chats.map((chat) => (
        <div key={chat._id} className="flex flex-col flex-1">
          <span
            className={`${ JSON.stringify(currentChat) === JSON.stringify(chat) ? "bg-green-300" : "" } p-4 mb-2 text-center text-xl border rounded-xl cursor-pointer`}
            onClick={() => setCurrentChat(chat)}
          >
            {determineChatName(chat)}
          </span>
        </div>
      ))}
    </div>
  );
};

const Chat = ({ currentChat }) => {
  const [user, setUser] = useState({_id: "660d3c2d5101acc17841f7e8"});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_URL}/message/${currentChat._id}`);
        if (!response.ok) {
          throw new Error("Error fetching salon info");
        }
        const messages = await response.json();
        console.log(messages);
        setMessages(messages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [currentChat]);

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
          chatId: currentChat._id,
          senderId: user._id,
          content: newMessage,
        }),
      });
      if (!response.ok) {
        throw new Error("Error creating messages");
      }
      const message = await response.json();
      setMessages([...messages, message]);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  }

  const handleMessageUpdate = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-200">
      <div class="flex-grow ml-2">
        {messages.map((message) => (
          <div key={message._id}>
            <div className={`${ user._id === message.sender._id ? "float-right clear-right" : "float-left clear-left" } p-2 mt-2 text-xl rounded-xl border border-green-700 bg-opacity-80`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {currentChat && (
        <div className="flex flex-col items-center justify-between mb-4">
          <form onSubmit={createNewMessage}>
            <input
              type="text"
              placeholder="Enter your messages here"
              onChange={handleMessageUpdate}
              className="text-xl border border-gray-300 rounded mr-2 p-2"
            />
            <button type="submit" class="bg-green-700 text-white">Send</button>
          </form>
        </div>
      )}
    </div>
  )
};

const MessagePage = () => {
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <div className="flex justify-between">
      <ChatList currentChat={currentChat} setCurrentChat={setCurrentChat} />
      <Chat currentChat={currentChat} />
    </div>
  );
};

export default MessagePage;
