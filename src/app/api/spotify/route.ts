import { getCurrentlyPlaying, getRecentlyPlayed } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Try to get currently playing track
    const currentlyPlayingResponse = await getCurrentlyPlaying();

    if (
      currentlyPlayingResponse.status === 204 ||
      currentlyPlayingResponse.status > 400
    ) {
      // Not currently playing, fetch recently played
      const recentlyPlayedResponse = await getRecentlyPlayed();

      if (recentlyPlayedResponse.status === 200) {
        const data = await recentlyPlayedResponse.json();
        const lastPlayed = data.items[0];

        return NextResponse.json({
          isPlaying: false,
          title: lastPlayed.track.name,
          artist: lastPlayed.track.artists
            .map((artist: { name: string }) => artist.name)
            .join(', '),
          album: lastPlayed.track.album.name,
          albumImageUrl: lastPlayed.track.album.images[0]?.url || '',
          songUrl: lastPlayed.track.external_urls.spotify,
        });
      }

      return NextResponse.json({
        isPlaying: false,
        title: 'Not Playing',
        artist: '',
        album: '',
        albumImageUrl: '',
        songUrl: '',
      });
    }

    const song = await currentlyPlayingResponse.json();

    if (!song.item) {
      return NextResponse.json({
        isPlaying: false,
        title: 'Not Playing',
        artist: '',
        album: '',
        albumImageUrl: '',
        songUrl: '',
      });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists
      .map((artist: { name: string }) => artist.name)
      .join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0]?.url || '';
    const songUrl = song.item.external_urls.spotify;

    return NextResponse.json({
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
    });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json(
      {
        isPlaying: false,
        title: 'Error',
        artist: '',
        album: '',
        albumImageUrl: '',
        songUrl: '',
      },
      { status: 500 },
    );
  }
}

export const revalidate = 60; // Revalidate every 60 seconds
