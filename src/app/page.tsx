"use client";

import { ChatBox, ChatHistory, TextBubble } from "@/components/custom";
import { ChatProvider } from "@/provider/chat";

export default function Home() {
  return (
    <div className="content-grid min-h-[calc(100svh-5rem)] content-end space-y-8 pb-8">
      <ChatProvider>
        <ChatHistory />
        <ChatBox />
      </ChatProvider>
    </div>
  );
}
