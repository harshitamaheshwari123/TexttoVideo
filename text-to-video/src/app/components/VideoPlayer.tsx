export default function VideoPlayer({ url }) {
  return url ? (
    <video controls className="w-full mt-4 rounded" autoPlay>
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : null;
}


