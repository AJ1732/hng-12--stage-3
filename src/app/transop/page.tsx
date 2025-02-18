"use client";

import React, { useState } from "react";
import { useLanguageDetection } from "@/hooks/use-language-detection"; // Adjust path as needed
import { useTranslation } from "@/hooks/use-translation"; // Adjust path as needed

const TranslatorForm = () => {
  const [inputText, setInputText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("fr");

  // Use our custom hooks.
  const {
    detectLanguage,
    detectedLanguage,
    error: detectionError,
    loading: detectionLoading,
  } = useLanguageDetection();

  const {
    translateText,
    translatedText,
    error: translationError,
    loading: translationLoading,
  } = useTranslation();

  // Handle the translate button click.
  const handleTranslate = async () => {
    // First, detect the language of the input text.
    const sourceLanguage = await detectLanguage(inputText);
    if (!sourceLanguage) return;

    // Then, translate the text from the detected language to the target language.
    await translateText(inputText, sourceLanguage, targetLanguage);
  };

  // Combine loading and error states.
  const overallLoading = detectionLoading || translationLoading;
  const overallError = detectionError || translationError;

  return (
    <div className="mx-auto max-w-md rounded-md border p-4">
      <h2 className="mb-4 text-xl font-bold">Translator</h2>

      {/* Input text area */}
      <div className="mb-4">
        <label htmlFor="inputText" className="mb-1 block font-medium">
          Text to translate:
        </label>
        <textarea
          id="inputText"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={4}
          className="w-full rounded border p-2"
          placeholder="Enter text here..."
        />
        {detectedLanguage && (
          <p className="text-sm text-gray-500">
            Detected language: {detectedLanguage}
          </p>
        )}
      </div>

      {/* Target language selection */}
      <div className="mb-4">
        <label htmlFor="languageSelect" className="mb-1 block font-medium">
          Select target language:
        </label>
        <select
          id="languageSelect"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="en">English (en)</option>
          <option value="fr">French (fr)</option>
          <option value="es">Spanish (es)</option>
          <option value="pt">Portuguese (pt)</option>
          <option value="ru">Russian (ru)</option>
          <option value="tr">Turkish (tr)</option>
        </select>
      </div>

      <button
        onClick={handleTranslate}
        className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        disabled={overallLoading}
      >
        {overallLoading ? "Processing..." : "Translate"}
      </button>

      {overallError && <p className="mt-4 text-red-500">{overallError}</p>}

      {translatedText && (
        <div className="mt-4">
          <h3 className="mb-2 font-semibold">Translated Text:</h3>
          <p className="rounded border p-2">{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslatorForm;
