// Define the interface for the detector, translator and summarizer based on the API documentation.
interface Detector {
  detect: (
    text: string,
  ) => Promise<Array<{ detectedLanguage: string; confidence: number }>>;
}

interface Translator {
  translate: (text: string) => Promise<string>;
}

interface Summarizer {
  summarize: (text: string, options?: { context?: string }) => Promise<string>;
  addEventListener: (
    type: "downloadprogress",
    listener: (e: { loaded: number; total: number }) => void,
  ) => void;
  ready?: Promise<void>;
}

// DEFINE TranslationAPI INTERFACE IF NEEDED
interface TranslationAPI {
  createDetector: () => Promise<Detector>;
  createTranslator: (options: {
    sourceLanguage: string;
    targetLanguage: string;
  }) => Promise<Translator>;
}

// INTERFACE FOR LANGUAGE DETECTOR
interface AILanguageDetector {
  capabilities: () => Promise<{ capabilities: string }>;
  create: (options?: {
    monitor?: (m: EventTarget) => void;
  }) => Promise<Detector & { ready?: Promise<void> }>;
}

// INTERFACE FOR AI TRANSLATOR
interface AITranslator {
  translator?: {
    create: (options: {
      sourceLanguage: string;
      targetLanguage: string;
    }) => Promise<Translator>;
  };
  languageDetector?: AILanguageDetector;
  summarizer?: AISummarizer;
}

// INTERFACE FOR SUMMARIZER
interface AISummarizer {
  capabilities: () => Promise<{ available: string }>;
  create: (options: {
    sharedContext: string;
    type: string;
    format: string;
    length: string;
  }) => Promise<Summarizer>;
}

// INLCUDE AI PROPERTY IN GLOBAL WINDOW INTERFACE
declare global {
  interface Window {
    ai?: AITranslator;
  }
}

// MAKES THE FILE TO BE TREATED LIKE A MODULE
export {};
