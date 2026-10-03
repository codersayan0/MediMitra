import React, { useState } from "react";
import "./patient-ai-chat.css";

type Language = "en" | "bn" | "hi";

interface FloatingAIChatProps {
  language?: Language;
  onClose: () => void;
}

const chatTranslations = {
  en: {
    title: "MediMitra AI",
    subtitle: "Your personal health assistant",
    welcome:
      "Hello! I'm MediMitra AI. How can I help you today?",
    placeholder: "Ask something...",
    send: "Send",
  },

  bn: {
    title: "MediMitra AI",
    subtitle: "আপনার ব্যক্তিগত স্বাস্থ্য সহকারী",
    welcome:
      "হ্যালো! আমি MediMitra AI। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    placeholder: "কিছু জিজ্ঞাসা করুন...",
    send: "পাঠান",
  },

  hi: {
    title: "MediMitra AI",
    subtitle: "आपका व्यक्तिगत स्वास्थ्य सहायक",
    welcome:
      "नमस्ते! मैं MediMitra AI हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
    placeholder: "कुछ पूछें...",
    send: "भेजें",
  },
};

interface Message {
  id: number;
  sender: "ai" | "user";
  text: string;
}

const FloatingAIChat: React.FC<FloatingAIChatProps> = ({
  language = "en",
  onClose,
}) => {
  const t = chatTranslations[language];

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: t.welcome,
    },
  ]);

  const sendMessage = () => {
    const trimmed = message.trim();

    if (!trimmed) return;

    setMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        sender: "user",
        text: trimmed,
      },
    ]);

    setMessage("");

    // Backend/Gemini integration will be added later.
    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          sender: "ai",
          text:
            "I'm currently in demo mode. AI and RAG integration will be connected later.",
        },
      ]);
    }, 500);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="ai-chat-window">
      {/* Header */}
      <div className="ai-chat-header">
        <div className="ai-chat-title-wrapper">
          <div className="ai-chat-avatar">✦</div>

          <div>
            <h3>{t.title}</h3>
            <span>{t.subtitle}</span>
          </div>
        </div>

        <button
          className="ai-close-button"
          onClick={onClose}
          aria-label="Close AI assistant"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="ai-chat-messages">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`ai-message-row ${item.sender}`}
          >
            {item.sender === "ai" && (
              <div className="message-avatar">✦</div>
            )}

            <div className={`ai-message ${item.sender}`}>
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="ai-chat-input-area">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.placeholder}
        />

        <button
          className="ai-send-button"
          onClick={sendMessage}
          aria-label={t.send}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default FloatingAIChat;