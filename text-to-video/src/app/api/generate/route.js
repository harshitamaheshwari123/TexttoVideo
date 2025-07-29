import { generateVideo } from "../../utils/replicate";
import { connectDB } from "../../lib/db";
import Video from "../../models/Video";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectDB();
    let prediction;
    try {
      prediction = await generateVideo(prompt);
    } catch (apiErr) {
      console.error("Replicate API error:", apiErr);
      return new Response(
        JSON.stringify({
          error: "Replicate API error",
          details: apiErr.message,
          stack: apiErr.stack,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // Poll until completed
    while (!["succeeded", "failed", "canceled"].includes(prediction.status)) {
      await new Promise((res) => setTimeout(res, 3000));
      const poll = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          },
        }
      );
      prediction = await poll.json();
    }

    if (prediction.status !== "succeeded") throw new Error("Generation failed");

    const videoUrl = prediction.output;
    const video = await Video.create({ prompt, videoUrl });

    return new Response(JSON.stringify({ video }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // Return full error stack for debugging (remove in production)
    return new Response(
      JSON.stringify({ error: err.message, stack: err.stack }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
