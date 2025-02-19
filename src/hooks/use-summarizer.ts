"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";

/**
 * Custom hook for summarizing text using the AI Summarizer API.
 * It handles API availability, loading, and error states.
 *
 * @returns { summarizeText, summary, error, loading }
 */
export function useSummarizer() {
  const [summary, setSummary] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Summarizes the provided text using the AI Summarizer API.
   *
   * @param text - The text to summarize.
   * @param context - Optional context to guide the summarization.
   *                  Defaults to "This article is intended for a tech-savvy audience."
   * @returns The summary as a string or void on error.
   */
  async function summarizeText(
    text: string,
    context: string = "This article is intended for a tech-savvy audience.",
  ): Promise<string | void> {
    setError("");
    setSummary("");
    setLoading(true);

    // Summarizer options
    const options = {
      sharedContext: "This is a linguistic processed text",
      type: "teaser",
      format: "plain-text",
      length: "short",
    };

    try {
      // Check if Summarizer API is available.
      if (!self.ai || !self.ai.summarizer) {
        throw new Error("Summarizer API is not supported in this browser.");
      }

      // Check Summarizer capabilities.
      const capabilities = await self.ai.summarizer.capabilities();
      const available = capabilities.available;
      let summarizer;

      if (available === "no") {
        throw new Error("The Summarizer API isn't usable.");
      }

      if (available === "readily") {
        // Summarizer is immediately available.
        summarizer = await self.ai.summarizer.create(options);
      } else {
        // Summarizer requires model download.
        summarizer = await self.ai.summarizer.create(options);
        summarizer.addEventListener("downloadprogress", (e) => {
          // Cast the event to include loaded and total properties.
          const progressEvent = e as unknown as {
            loaded: number;
            total: number;
          };
          console.log(
            `Downloaded ${progressEvent.loaded} of ${progressEvent.total} bytes.`,
          );
        });
        await summarizer.ready;
      }

      // Perform the summarization.
      const result = await summarizer.summarize(text, { context });
      setSummary(result);
      setLoading(false);
      return result;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unknown error occurred during summarization";

      setError(errorMessage);
      console.error("Summarizer error:", err);

      toast({
        title: "Summarization Failed",
        description: errorMessage,
        variant: "destructive",
      });

      setLoading(false);
    }
  }

  return { summarizeText, summary, error, loading };
}
