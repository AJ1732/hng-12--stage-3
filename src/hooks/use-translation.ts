"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";

/**
 * Custom hook for translating text using the AI translation API.
 * It handles loading and error states.
 *
 * @returns { translateText, translatedText, error, loading }
 */
export function useTranslation() {
  const [translatedText, setTranslatedText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Translates the provided text from the source language to the target language.
   *
   * @param text - The text to translate.
   * @param sourceLanguage - The detected source language.
   * @param targetLanguage - The language code to translate the text into.
   * @returns The translated text or void on error.
   */
  async function translateText(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
  ): Promise<string | void> {
    setError("");
    setTranslatedText("");
    setLoading(true);

    try {
      // IS TRANSLATOR API AVAILABLE
      if (
        !self.ai ||
        !self.ai.translator ||
        typeof self.ai.translator.create !== "function"
      ) {
        throw new Error("Translation API is not supported in this browser.");
      }

      // IS SOURCE AND TARGET TEXT ARE THE SAME
      if (sourceLanguage === targetLanguage) {
        setTranslatedText(text);
        setLoading(false);
        return text;
      }

      // CREATE TRANSLATOR AND PERFORM TRANSLATION
      const translator = await self.ai.translator.create({
        sourceLanguage,
        targetLanguage,
      });
      const result = await translator.translate(text.trim());
      setTranslatedText(result);
      setLoading(false);
      return result;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unknown error occurred during translation";

      setError(errorMessage);
      console.error("Translation error:", err);

      toast({
        title: "Translation Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  return { translateText, translatedText, error, loading };
}
