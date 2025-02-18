"use client";

import { v4 as uuidv4 } from "uuid";

import { useSummarizer } from "@/hooks/use-summarizer";
import { toast } from "@/hooks/use-toast";

import type { ChatMessage } from "@/types/chat";
import { useChat } from "@/provider/chat";

/**
 * Custom hook that encapsulates the summarization flow.
 * It dispatches the user message, creates a placeholder AI message,
 * calls the summarizer API, and updates the chat state with the summary.
 *
 * @returns { handleSummarizeFlow, summarizationError }
 */
export function useSummarizeFlow() {
  const { dispatch } = useChat();
  const { summarizeText, error: summarizationError } = useSummarizer();

  /**
   * Handles the summarization flow.
   *
   * @param data - An object containing the chat text and optional language.
   */
  async function handleSummarizeFlow(data: {
    chat: string;
    language?: string;
  }): Promise<void> {
    // Dispatch the user message.
    const userMessage: ChatMessage = {
      id: uuidv4(),
      text: data.chat,
      sender: "user",
      timestamp: Date.now(),
    };
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });

    // Create and dispatch a placeholder for the AI summarization.
    const placeholderAiMessage: ChatMessage = {
      id: uuidv4(),
      text: "",
      sender: "ai",
      timestamp: Date.now(),
      loading: true,
    };
    dispatch({ type: "ADD_MESSAGE", payload: placeholderAiMessage });

    try {
      // Call the summarizer API with the input text and context.
      const result = await summarizeText(
        data.chat,
        "This text is intended for a linguistic savvy audience.",
      );
      if (!result) return;

      // Update the placeholder message with the summarization result.
      dispatch({
        type: "UPDATE_MESSAGE",
        payload: {
          id: placeholderAiMessage.id,
          text: result,
        },
      });
    } catch (error: unknown) {
      console.error("Summarization error:", error);
      const errorMsg =
        error instanceof Error ? error.message : "Failed to summarize message";
      toast({
        title: "Summarization Error",
        description: summarizationError || errorMsg,
        variant: "destructive",
      });
    }
  }

  return { handleSummarizeFlow, summarizationError };
}
