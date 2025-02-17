"use client";

import { ChatLoading, TextBubble } from "@/components/custom";
import { useChat } from "@/provider/chat";

const ChatHistory = () => {
  const { state } = useChat();

  return (
    <section className="space-y-4 p-4">
      {state.messages.map((msg) => (
        <TextBubble
          key={msg.id}
          direction={msg.sender === "user" ? "right" : "left"}
        >
          {msg.sender === "ai" && msg.loading ? <ChatLoading /> : msg.text}
        </TextBubble>
      ))}
    </section>
  );
};

export default ChatHistory;
