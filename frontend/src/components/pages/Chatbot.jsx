import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../main"; 
import "./Chatbot.css";

function Chatbot() {
  const { mode } = useContext(Context); // Get mode from context
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your Blog Writing Assistant 📝 Ask me anything about content creation, SEO, or writing tips!"
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.className = mode === "dark" ? "dark-mode" : "light-mode";
    
    // Cleanup function to remove classes when component unmounts
    return () => {
      document.body.className = "";
    };
  }, [mode]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error fetching response ❌ Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background effects - these elements are styled by CSS */}
      <div className="digital-rain"></div>
      <div className="holo-grid"></div>
      
      <div className="chatbot-container">
        {/* Header Section */}
        <div className="chatbot-header">
          <h3 className="chatbot-title">Blog Writing Assistant</h3>
          <p className="chatbot-subtitle">Your AI-powered content creation companion</p>
        </div>
        
        {/* Chat Window */}
        <div className="chat-window">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.sender === "user" ? "user" : "bot"}`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="message bot typing">
              Analyzing your question and preparing helpful insights...
            </div>
          )}
        </div>
        
        {/* Input Area */}
        <div className="input-area">
          <input
            type="text"
            placeholder="Ask about blogging, SEO, content ideas..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Chatbot;