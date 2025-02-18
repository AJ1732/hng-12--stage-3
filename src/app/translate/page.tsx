"use client";

import React, { useState, useEffect } from "react";

// interface DownloadProgressEvent extends Event {
//   loaded: number;
//   total: number;
// }

const TranslatorForm = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("fr");
  const [error, setError] = useState("");

  // IS API AVAILABLE?
  useEffect(() => {
    console.log("self.ai:", self.ai);
    console.log("self.ai.translator:", self.ai?.translator);
    console.log("self.ai.languageDetector:", self.ai?.languageDetector);
  }, []);

  const handleTranslate = async () => {
    setError("");
    setTranslatedText("");

    // IS TRANSLATOR API AVAILABLE.
    if (
      !self.ai ||
      !self.ai.translator ||
      typeof self.ai.translator.create !== "function"
    ) {
      setError("Translation API is not supported in this browser.");
      console.error("Translation API not supported. self.ai:", self.ai);
      return;
    }

    // IS LANGUAGE DETECTOR AVAILABLE
    if (
      !self.ai.languageDetector ||
      typeof self.ai.languageDetector.capabilities !== "function"
    ) {
      setError("Language Detector API is not supported in this browser.");
      console.error("Language Detector API not supported. self.ai:", self.ai);
      return;
    }

    try {
      // LANGUAGE DETECTOR CAPABILITIES
      const languageDetectorCapabilities =
        await self.ai.languageDetector.capabilities();
      const canDetect = languageDetectorCapabilities.capabilities;
      let detector;
      if (canDetect === "no") {
        setError("The language detector isn't usable.");
        return;
      }
      if (canDetect === "readily") {
        detector = await self.ai.languageDetector.create();
      } else {
        detector = await self.ai.languageDetector
          .create
          //   {
          //   monitor(m) {
          //     m.addEventListener("downloadprogress", (e) => {
          //       // Cast the event to our custom type.
          //       const progressEvent = e as DownloadProgressEvent;
          //       console.log(
          //         `Downloaded ${progressEvent.loaded} of ${progressEvent.total} bytes.`,
          //       );
          //     });
          //   },
          // }
          ();
        await detector.ready;
      }

      // DETECT LANGUAGE OF INPUT TEXT
      const detectionResults = await detector.detect(inputText.trim());
      if (!detectionResults || detectionResults.length === 0) {
        setError("Could not detect the language of the input text.");
        return;
      }
      const sourceLanguage = detectionResults[0].detectedLanguage;
      console.log("Detected source language:", detectedLanguage);
      setDetectedLanguage(sourceLanguage)

      // CHECK IF SOURCE IS SAME AS TARGET LANGUAGE
      if (sourceLanguage === targetLanguage) {
        setTranslatedText(inputText);
        return;
      }

      // CREATE TRANSLATOR.
      const translator = await self.ai.translator.create({
        sourceLanguage,
        targetLanguage,
      });
      const result = await translator.translate(inputText.trim());
      setTranslatedText(result);
    } catch (err) {
      console.error("Translation error:", err);
      setError("An error occurred during translation. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-md border p-4">
      <h2 className="mb-4 text-xl font-bold">Translator</h2>

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
      </div>

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
      >
        Translate
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

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
