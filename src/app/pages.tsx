"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [provider, setProvider] = useState("openai");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, provider }),
      });

      const data = await res.json();
      setResponse(data.text || "No response from model.");
    } catch (err) {
      setResponse("Error: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-4">Author.ai ✍️</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        Your AI-powered co-writer. Select a provider and start writing.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg flex flex-col gap-4"
      >
        <textarea
          className="border rounded-lg p-3 w-full"
          rows={4}
          placeholder="Write your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <select
          className="border rounded-lg p-2"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        >
          <option value="openai">OpenAI (brains & polish)</option>
          <option value="groq">Groq (speed & drafting)</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg disabled:opacity-50"
          disabled={loading || !prompt}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 w-full max-w-lg">
          <h2 className="font-semibold mb-2">Response:</h2>
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </main>
  );
}
