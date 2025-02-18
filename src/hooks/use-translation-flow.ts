"use client";

import { v4 as uuidv4 } from "uuid";

import { toast } from "@/hooks/use-toast";
import { useLanguageDetection } from "@/hooks/use-language-detection";
import { useTranslation } from "@/hooks/use-translation";

import { getAIResponse } from "@/utils/get-ai-response";
import { ChatMessage } from "@/types/chat";
import { useChat } from "@/provider/chat";

/**
 * Custom hook that handles the translation flow.
 * It uses language detection and translation hooks and returns a function to handle the flow.
 *
 * @returns { handleTranslateFlow, detectionError, translationError }
 */
export function useTranslateFlow() {
  const { dispatch } = useChat();
  const { detectLanguage, error: detectionError } = useLanguageDetection();
  const { translateText, error: translationError } = useTranslation();

  /**
   * Handles the translation flow:
   * 1. Detects the source language.
   * 2. Dispatches a user message.
   * 3. Gets an AI response.
   * 4. Translates the AI response if needed.
   * 5. Updates the chat state.
   *
   * @param data - An object containing chat text and target language.
   */
  async function handleTranslateFlow(data: {
    chat: string;
    language?: string;
  }): Promise<void> {
    // Detect the source language.
    const sourceLanguage = await detectLanguage(data.chat);
    if (!sourceLanguage) return;

    // Create and dispatch user message.
    const userMessage: ChatMessage = {
      id: uuidv4(),
      text: data.chat,
      sender: "user",
      timestamp: Date.now(),
      detectedLanguage: sourceLanguage,
    };
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });

    // Placeholder message for AI response.
    const placeholderAiMessage: ChatMessage = {
      id: uuidv4(),
      text: "",
      sender: "ai",
      timestamp: Date.now(),
      loading: true,
    };
    dispatch({ type: "ADD_MESSAGE", payload: placeholderAiMessage });

    try {
      // Get AI reply.
      const aiReplyText = await getAIResponse(data.chat);

      // If target language is provided and differs from the source, translate the AI reply.
      if (data.language && data.language !== sourceLanguage) {
        const translatedText = await translateText(
          aiReplyText,
          sourceLanguage,
          data.language,
        );
        if (translatedText) {
          dispatch({
            type: "UPDATE_MESSAGE",
            payload: {
              id: placeholderAiMessage.id,
              text: translatedText,
              detectedLanguage: data.language,
            },
          });
          return;
        }
      }
      // Otherwise, update with the original AI reply.
      dispatch({
        type: "UPDATE_MESSAGE",
        payload: {
          id: placeholderAiMessage.id,
          text: aiReplyText,
          detectedLanguage: sourceLanguage,
        },
      });
    } catch (error: unknown) {
      console.error("Translation error:", error);
      toast({
        title: "Translation Error",
        description:
          translationError || detectionError || "Failed to translate message",
        variant: "destructive",
      });
    }
  }

  return { handleTranslateFlow, detectionError, translationError };
}
