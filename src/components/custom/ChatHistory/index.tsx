"use client";

import { useEffect, useRef } from "react";
import { ChatLoading, TextBubble } from "@/components/custom";
import { useChat } from "@/provider/chat";

const ChatHistory = () => {
  const { state } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // SCROLL TO THE LASTEST MESSAGE
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.messages]);

  return (
    <section className="full-width chats content-grid max-h-[calc(100svh-22rem)] overflow-y-auto">
      <div className="space-y-8 p-4 md:p-8">
        {state.messages.map((msg) => (
          <TextBubble
            key={msg.id}
            direction={msg.sender === "user" ? "right" : "left"}
            timestamp={msg.timestamp}
            detectedLanguage={msg.detectedLanguage}
          >
            {msg.sender === "ai" && msg.loading ? <ChatLoading /> : msg.text}
          </TextBubble>
        ))}
        {/* ANCHOR TO THE SCROLL EFFECT */}
        <div ref={messagesEndRef} />
      </div>
    </section>
  );
};

export default ChatHistory;
