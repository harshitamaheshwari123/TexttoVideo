"use client";
import { useState } from "react";
import PromptForm from "./components/PromptForm";
import VideoPlayer from "./components/VideoPlayer";

export default function HomePage() {
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-2">Text to Video AI Generator</h1>
      <p className="text-lg mb-6">
        Turn your imagination into stunning videos with one click.
      </p>
      <PromptForm onResult={setVideoUrl} />
      <VideoPlayer url={videoUrl} />
    </main>
  );
}
