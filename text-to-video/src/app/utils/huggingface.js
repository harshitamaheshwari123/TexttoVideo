export async function generateVideoFromHuggingFace(prompt) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/damo-vilab/modelscope-text-to-video-synthesis",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Hugging Face API error:", errorData);
    throw new Error(
      `Failed to call Hugging Face API. Status: ${response.status}`
    );
  }

  // ✅ Model returns a JSON with video URL
  const result = await response.json();
  console.log("Hugging Face Response:", result);

  if (!result || !result[0] || !result[0].url) {
    throw new Error("Video URL not found in Hugging Face response.");
  }

  return result[0].url;
}
