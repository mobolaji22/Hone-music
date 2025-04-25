import { SpotifyService } from "../services/spotifyApi";

// Fetch playlist details using Spotify API
export const fetchPlaylistDetails = async (playlistId) => {
  try {
    console.log(`Fetching details for playlist: ${playlistId}`);

    // Get playlist details
    const playlistData = await SpotifyService.getPlaylist(playlistId);

    // Get playlist tracks
    const tracksData = await SpotifyService.getPlaylistTracks(playlistId);

    // Transform tracks data to match expected format
    const tracks =
      tracksData.items?.map((item) => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists?.[0]?.name,
        album: item.track.album?.name,
        duration_ms: item.track.duration_ms,
        added_at: item.added_at,
      })) || [];

    return {
      id: playlistData.id,
      name: playlistData.name,
      description: playlistData.description,
      owner: {
        id: playlistData.owner?.id,
        name: playlistData.owner?.display_name,
      },
      collaborative: playlistData.collaborative,
      tracks,
    };
  } catch (error) {
    console.error("Error fetching playlist details:", error);
    throw error;
  }
};

// Update playlist details using Spotify API
export const updatePlaylist = async (playlistId, updates) => {
  try {
    console.log(`Updating playlist ${playlistId} with:`, updates);

    // Update playlist details
    const response = await SpotifyService.getPlaylist(playlistId);

    // Merge updates with existing data
    const updatedData = {
      ...response,
      ...updates,
    };

    return updatedData;
  } catch (error) {
    console.error("Error updating playlist:", error);
    throw error;
  }
};

// Add other playlist-related API functions as needed
// e.g., addTrackToPlaylist, removeTrackFromPlaylist, addCollaborator, etc.
