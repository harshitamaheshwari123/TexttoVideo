"use client";
import { useState } from "react";

export default function PromptForm({ onResult }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setLoading(false);
    onResult(data.videoUrl);
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        className="p-2 border rounded"
        placeholder="Enter your video prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Video"}
      </button>
    </div>
  );
}
