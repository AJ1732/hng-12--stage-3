"use client";

import { ChatBox, TextBubble } from "@/components/custom";

export default function Home() {
  return (
    <div className="content-grid min-h-[calc(100svh-5rem)] content-end space-y-8 py-8">
      <section className="mt-auto flex flex-col space-y-4 rounded-3xl p-4">
        <TextBubble direction="left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptas
          praesentium quidem temporibus corrupti harum, numquam debitis
          molestiae voluptatem facere unde vel ullam.
        </TextBubble>

        <TextBubble>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </TextBubble>
      </section>

      <ChatBox />
    </div>
  );
}
