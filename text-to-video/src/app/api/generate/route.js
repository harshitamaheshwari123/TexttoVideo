import { NextResponse } from "next/server";
import { generateVideoFromHuggingFace } from "@/app/utils/huggingface";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const videoUrl = await generateVideoFromHuggingFace(prompt); // ✅ rename to `videoUrl`
    return NextResponse.json({ videoUrl }); // ✅ send as `videoUrl`
  } catch (error) {
    console.error("Error generating video:", error);
    return NextResponse.json(
      { error: "Failed to generate video" },
      { status: 500 }
    );
  }
}
