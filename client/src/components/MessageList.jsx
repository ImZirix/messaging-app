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
