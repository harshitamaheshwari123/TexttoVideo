import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  prompt: String,
  videoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Video || mongoose.model("Video", VideoSchema);
