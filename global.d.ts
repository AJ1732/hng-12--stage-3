// Define the interface for the detector and translator based on the API documentation.
interface Detector {
  detect: (
    text: string,
  ) => Promise<Array<{ detectedLanguage: string; confidence: number }>>;
}

interface Translator {
  translate: (text: string) => Promise<string>;
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
}

// INLCUDE AI PROPERTY IN GLOBAL WINDOW INTERFACE
declare global {
  interface Window {
    ai?: AITranslator;
  }
}

// MAKES THE FILE TO BE TREATED LIKE A MODULE
export {};
