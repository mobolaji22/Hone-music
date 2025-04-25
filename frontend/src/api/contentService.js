import { SpotifyService } from "../services/spotifyApi";

// Fetch personalized content using Spotify API
export const fetchPersonalizedContent = async () => {
  try {
    console.log("API: Fetching personalized content...");

    // Get user's playlists for daily mixes
    const userPlaylists = await SpotifyService.getUserPlaylists("me");
    const dailyMixes = userPlaylists.items.slice(0, 2).map((playlist) => ({
      id: playlist.id,
      title: playlist.name,
      description: playlist.description || "",
      imageUrl: playlist.images?.[0]?.url || "https://via.placeholder.com/150",
      source: userPlaylists.source,
    }));

    // Get recently played tracks
    const recentTracks = await SpotifyService.getPlaylistTracks("me", {
      limit: 2,
    });
    const recentlyPlayed =
      recentTracks.items?.map((item) => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists?.[0]?.name,
        imageUrl:
          item.track.album?.images?.[0]?.url ||
          "https://via.placeholder.com/150",
      })) || [];

    // Get recommended playlists
    const recommendedPlaylists = await SpotifyService.search("playlist", {
      type: "playlist",
      limit: 2,
    });
    const playlists =
      recommendedPlaylists.playlists?.items?.map((playlist) => ({
        id: playlist.id,
        title: playlist.name,
        imageUrl:
          playlist.images?.[0]?.url || "https://via.placeholder.com/150",
      })) || [];

    return {
      dailyMixes,
      recentlyPlayed,
      recommendedPlaylists: playlists,
    };
  } catch (error) {
    console.error("Error fetching personalized content:", error);
    throw error;
  }
};

// Fetch trending content using Spotify API
export const fetchTrendingContent = async () => {
  try {
    console.log("API: Fetching trending content...");

    // Get new releases
    const albumsResponse = await SpotifyService.search("", {
      type: "album",
      limit: 2,
    });
    const newReleases =
      albumsResponse.albums?.items?.map((album) => ({
        id: album.id,
        title: album.name,
        artist: album.artists?.[0]?.name,
        imageUrl: album.images?.[0]?.url || "https://via.placeholder.com/150",
      })) || [];

    // Get trending tracks
    const tracksResponse = await SpotifyService.search("", {
      type: "track",
      limit: 2,
    });
    const trendingTracks =
      tracksResponse.tracks?.items?.map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artists?.[0]?.name,
        imageUrl:
          track.album?.images?.[0]?.url || "https://via.placeholder.com/150",
      })) || [];

    // Get popular playlists
    const playlistResponse = await SpotifyService.search("top", {
      type: "playlist",
      limit: 2,
    });
    const popularPlaylists =
      playlistResponse.playlists?.items?.map((playlist) => ({
        id: playlist.id,
        title: playlist.name,
        imageUrl:
          playlist.images?.[0]?.url || "https://via.placeholder.com/150",
      })) || [];

    return {
      newReleases,
      trendingTracks,
      popularPlaylists,
    };
  } catch (error) {
    console.error("Error fetching trending content:", error);
    throw error;
  }
};

// Placeholder for fetching lyrics
export const fetchLyrics = async (trackId) => {
  console.log(`API: Fetching lyrics for track ID: ${trackId}`);
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Return mock lyrics data
  // In a real app, this would fetch from your backend
  if (trackId) {
    // Example condition - return lyrics for any valid trackId for now
    return {
      text: `This is a placeholder lyric line 1 for track ${trackId}.\nLine 2 of the lyrics.\n...\nLine 3: Keep the rhythm going.\nLine 4: Feel the music flow.\nLine 5: End of placeholder lyrics.`,
      syncType: "LINE_SYNCED", // or 'UNSYNCED'
    };
  } else {
    // Simulate lyrics not found
    return { text: "Lyrics currently unavailable for this track." };
  }
};
