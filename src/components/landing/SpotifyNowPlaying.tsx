export default function SpotifyNowPlaying() {
  return (
    <div className="mt-4 w-full max-w-md rounded-2xl">
      <iframe
        src="https://open.spotify.com/embed/track/4iz9lGMjU1lXS51oPmUmTe?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="block rounded-2xl"
      />
    </div>
  );
}
