export async function generateVideo(prompt) {
  // Replace the version string below with the actual model version ID from Replicate
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "2e90545a27b3343aeb56f93ae7429c2fdc52f245f178efc4f885a845f2d4a368",

      input: { prompt },
    }),
  });

  if (!response.ok) throw new Error("Failed to call Replicate API");
  return await response.json(); // handle polling later
}
