import { NextResponse } from "next/server";
import { generateVideo } from "@/app/utils/replicate";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || prompt.trim() === "") {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const videoUrl = await generateVideo(prompt);
    return NextResponse.json({ videoUrl });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Replicate API error", details: error.message },
      { status: 500 }
    );
  }
}
