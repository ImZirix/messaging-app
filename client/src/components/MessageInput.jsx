import { useState } from "react";

function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 border-t bg-white flex gap-2 items-center">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a message..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        aria-label="Message input"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
