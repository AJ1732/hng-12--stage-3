"use client";

import { useState } from "react";

/**
 * Custom hook for detecting the language of a given text.
 * It handles loading and error states.
 *
 * @returns { detectLanguage, detectedLanguage, error, loading }
 */
export function useLanguageDetection() {
  const [detectedLanguage, setDetectedLanguage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Detects the language of the provided text.
   *
   * @param text - The text to analyze.
   * @returns The detected language code or void on error.
   */
  async function detectLanguage(text: string): Promise<string | void> {
    setError("");
    setDetectedLanguage("");
    setLoading(true);

    try {
      // Check if the language detector API is available.
      if (
        !self.ai ||
        !self.ai.languageDetector ||
        typeof self.ai.languageDetector.capabilities !== "function"
      ) {
        throw new Error("Language Detector API is not supported in this browser.");
      }

      // Get detector capabilities.
      const capabilities = await self.ai.languageDetector.capabilities();
      const canDetect = capabilities.capabilities;
      let detector;
      if (canDetect === "no") {
        throw new Error("The language detector isn't usable.");
      }
      if (canDetect === "readily") {
        detector = await self.ai.languageDetector.create();
      } else {
        // If the detector requires a model download, you can optionally monitor the progress.
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              // Optionally cast e to a custom type for loaded/total.
              const progressEvent = e as any;
              console.log(`Downloaded ${progressEvent.loaded} of ${progressEvent.total} bytes.`);
            });
          },
        });
        await detector.ready;
      }

      // Detect the language of the text.
      const results = await detector.detect(text.trim());
      if (!results || results.length === 0) {
        throw new Error("Could not detect the language of the input text.");
      }
      const language = results[0].detectedLanguage;
      setDetectedLanguage(language);
      setLoading(false);
      return language;
    } catch (err: any) {
      console.error("Language detection error:", err);
      setError(err.message || "An error occurred during language detection.");
      setLoading(false);
    }
  }

  return { detectLanguage, detectedLanguage, error, loading };
}
