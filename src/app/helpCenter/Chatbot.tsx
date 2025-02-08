import React, { useState } from "react";
import { Message } from "../../../types/components"; 
const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { user: "User", text: input }]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { user: "Bot", text: "How can I help you?" },
        ]);
      }, 1000);
      setInput("");
    }
  };
  return (
    <div className="chatbot-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.user === "User" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
