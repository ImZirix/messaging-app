import React, { useEffect, useState } from "react";
import API from "../api/api.js";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import MessageList from "../components/MessageList.jsx";
import MessageInput from "../components/MessageInput.jsx";
import Logout from "./Logout.jsx";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // new state

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await API.get("api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    }
    fetchUsers();
  }, []);

  const handleSelectUser = async (userId) => {
    setSelectedUserId(userId);
    setSidebarOpen(false); // close sidebar on mobile after selecting user
    try {
      const res = await API.get(`api/messages/${userId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages: ", err);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || !selectedUserId) return;

    try {
      const res = await API.post("/api/messages", {
        receiverId: selectedUserId,
        text: text.trim(),
      });

      setMessages((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header logout={Logout} />
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar toggle button for mobile */}
        <button
          className="md:hidden p-2 m-2 bg-blue-600 text-white rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Close Users" : "Open Users"}
        </button>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-64 bg-gray-100`}
        >
          <Sidebar
            users={users}
            onSelectUser={handleSelectUser}
            selectedUserId={selectedUserId}
          />
        </div>

        {/* Chat area */}
        <div className="flex flex-col flex-1 border-l">
          <MessageList
            selectedUserId={selectedUserId}
            setMessages={setMessages}
            messages={messages}
          />
          <MessageInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
