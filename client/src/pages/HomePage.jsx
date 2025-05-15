import React, { useEffect, useState } from "react";
import API from "../api/api.js";
function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Messaging App</h1>
      <button className="bg-blue-800 px-3 py-1 rounded">Logout</button>
    </header>
  );
}

function Sidebar({ users, onSelectUser, selectedUserId }) {
  return (
    <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="font-semibold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`cursor-pointer p-2 rounded ${
              selectedUserId === user.id ? "bg-blue-200" : "hover:bg-gray-200"
            }`}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg) => (
        <div key={msg.id} className="mb-2">
          <span className="font-semibold">{msg.senderName}: </span>
          <span>{msg.text}</span>
        </div>
      ))}
    </div>
  );
}

function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 border-t flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
        placeholder="Type a message..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    }
    fetchUsers();
  }, []);

  const handleSelectUser = async (userId) => {
    setSelectedUserId(userId);
    try {
      const res = await API.get(`/api/messages/${userId}`, {});
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages: ", err);
    }
  };

  const handleSendMessage = (text) => {
    // TODO: Call API to send message here

    // For now, just add message locally
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, senderName: "You", text },
    ]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          users={users}
          onSelectUser={handleSelectUser}
          selectedUserId={selectedUserId}
        />
        <div className="flex flex-col flex-1 border-l">
          <MessageList messages={messages} />
          <MessageInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
