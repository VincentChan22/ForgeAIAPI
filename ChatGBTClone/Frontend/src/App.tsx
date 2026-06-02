import { useState } from "react";

import type { Message } from "./types/index.js";
// Library for making HTTP requests
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:5001';

function App() {
  // Chatbot's frontend memory
  const [messages, setMessages] = useState<Message[]>([]);
  // Stores whatever the user is typing into the textbox
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    // Create updated conversation with all previous messages + newest message
    const updatedMessages : Message[] = [
      ...messages,
      { role: "user", content: input },
    ];

    // Update UI immediately
    setMessages(updatedMessages);

    try {
      // Send conversation to backend/OpenAI
      const response = await axios.post(
        //"http://localhost:5001/chat",
        `${baseURL}/chat`,
        {
          messages: updatedMessages,
        }
      );

      // Add AI response
      setMessages([
        ...updatedMessages,
        response.data,
      ]);

      // Reset input textbox
      setInput("");
    } catch (error) {
      console.error("Error talking to backend:", error);
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Chatbot Demo</h1>

      <div
        style={{
          border: "1px solid gray",
          padding: "1rem",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "1rem",
        }}
      >
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role}:</strong>{" "}
            {message.content}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{
          width: "70%",
          padding: "0.5rem",
          marginRight: "1rem",
        }}
      />

      <button onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default App;