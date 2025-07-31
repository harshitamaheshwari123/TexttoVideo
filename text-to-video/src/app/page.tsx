"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVideoSrc("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.videoUrl) {
        setVideoSrc(data.videoUrl); // ✅ Use the video URL from Hugging Face
      } else {
        alert("Error generating video.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Text to Video with Zeroscope</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          className="w-full p-3 mb-4 rounded text-black"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 w-full py-2 rounded text-white"
        >
          Generate Video
        </button>
      </form>

      {loading && <p className="mt-6">Generating video... Please wait ⏳</p>}

      {videoSrc && (
        <video
          controls
          className="mt-6 rounded shadow-lg max-w-full w-[576px]"
          src={videoSrc}
        />
      )}
    </main>
  );
}
