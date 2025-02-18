/**
 * Formats a timestamp into a localized 12-hour time string.
 * @param timestamp - The timestamp in milliseconds since Unix epoch.
 * @returns Formatted time string (e.g., "3:45 PM") or empty string if no timestamp provided.
 */

export const formatTime = (timestamp?: number) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
