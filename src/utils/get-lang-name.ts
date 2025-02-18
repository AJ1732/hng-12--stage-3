/**
 * Returns the full language name for a given language code.
 * @param code - The language code (e.g., "en", "fr").
 * @returns language name, or "Unknown Language" if not found.
 */

export function getLanguageName(code: string): string {
  const languageMap: Record<string, string> = {
    en: "English",
    fr: "French",
    es: "Spanish",
    pt: "Portuguese",
    ru: "Russian",
    tr: "Turkish",
  };

  return languageMap[code] ?? "Unknown";
}
