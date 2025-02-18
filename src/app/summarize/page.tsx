"use client";

import { useState } from "react";
import { useSummarizer } from "@/hooks/use-summarizer";

const SummarizerForm = () => {
  const [inputText, setInputText] = useState("");
  const { summarizeText, summary, error, loading } = useSummarizer();

  const handleSummarize = async () => {
    await summarizeText(inputText);
  };

  return (
    <div className="mx-auto max-w-md rounded-md border p-4">
      <h2 className="mb-4 text-xl font-bold">Summarizer</h2>

      <div className="mb-4">
        <label htmlFor="inputText" className="mb-1 block font-medium">
          Text to Summarize:
        </label>
        <textarea
          id="inputText"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={6}
          className="w-full rounded border p-2"
          placeholder="Paste your article text here..."
        />
      </div>

      <button
        onClick={handleSummarize}
        className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {summary && (
        <div className="mt-4">
          <h3 className="mb-2 font-semibold">Summary:</h3>
          <p className="whitespace-pre-wrap rounded border p-2">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummarizerForm;
