import { useEffect } from "react";
import API from "../api/api.js";

function MessageList({ selectedUserId, messages, setMessages }) {
  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedUserId) return;

      try {
        const res = await API.get(`/api/messages/${selectedUserId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error loading messages:", err);
      }
    };

    loadMessages();
  }, [selectedUserId]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
      {messages.map((msg) => {
        const isSender = msg.sender.id === localStorage.getItem("userId");
        return (
          <div
            key={msg.id}
            className={`flex ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg shadow text-sm break-words ${
                isSender
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              <div className="font-medium text-xs mb-1">
                {msg.sender.username}
              </div>
              <div>{msg.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;
