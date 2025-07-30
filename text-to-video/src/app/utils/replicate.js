import Replicate from "replicate";

console.log(
  "Loaded Replicate API Token:",
  process.env.REPLICATE_API_TOKEN ? "[present]" : "[missing]"
);
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateVideo(prompt) {
  try {
    const output = await replicate.run("google/veo-3-fast", {
      input: {
        prompt,
        fps: 8,
        width: 576,
        height: 1024,
        duration: 4,
      },
    });

    if (Array.isArray(output) && output.length > 0) {
      return output[0];
    } else {
      throw new Error("No output received from Replicate.");
    }
  } catch (error) {
    console.error("Error type:", typeof error);
    console.error("Error message:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error("Replicate API No Response Received:", error.request);
    } else {
      console.error("Full error:", error);
    }
    throw new Error("Failed to call Replicate API");
  }
}
