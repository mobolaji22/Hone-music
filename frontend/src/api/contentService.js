// Simulate fetching personalized content
export const fetchPersonalizedContent = async () => {
  console.log("API: Fetching personalized content...");
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    dailyMixes: [
      {
        id: "dm1",
        title: "Daily Mix 1",
        imageUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Mix1",
      },
      {
        id: "dm2",
        title: "Daily Mix 2",
        imageUrl: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Mix2",
      },
    ],
    recentlyPlayed: [
      {
        id: "rp1",
        title: "Liked Songs",
        artist: "Various Artists",
        imageUrl: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Liked",
      },
      {
        id: "rp2",
        title: "Chill Vibes",
        artist: "Playlist",
        imageUrl: "https://via.placeholder.com/150/FFFF00/000000?text=Chill",
      },
    ],
    recommendedPlaylists: [
      {
        id: "pl1",
        title: "Focus Flow",
        imageUrl: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Focus",
      },
      {
        id: "pl2",
        title: "Workout Beats",
        imageUrl: "https://via.placeholder.com/150/00FFFF/000000?text=Workout",
      },
    ],
  };
};

// Simulate fetching trending content
export const fetchTrendingContent = async () => {
  console.log("API: Fetching trending content...");
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 700));
  return {
    newReleases: [
      {
        id: "nr1",
        title: "New Album A",
        artist: "Artist X",
        imageUrl: "https://via.placeholder.com/150/FFA500/FFFFFF?text=NewA",
      },
      {
        id: "nr2",
        title: "Single B",
        artist: "Artist Y",
        imageUrl: "https://via.placeholder.com/150/800080/FFFFFF?text=NewB",
      },
    ],
    trendingTracks: [
      {
        id: "tt1",
        title: "Viral Hit 1",
        artist: "Singer Z",
        imageUrl: "https://via.placeholder.com/150/A52A2A/FFFFFF?text=Trend1",
      },
      {
        id: "tt2",
        title: "Trending Sound",
        artist: "Producer W",
        imageUrl: "https://via.placeholder.com/150/D2691E/FFFFFF?text=Trend2",
      },
    ],
    popularPlaylists: [
      {
        id: "pp1",
        title: "Top Hits Today",
        imageUrl: "https://via.placeholder.com/150/6495ED/FFFFFF?text=TopHits",
      },
      {
        id: "pp2",
        title: "Global Chart",
        imageUrl: "https://via.placeholder.com/150/DC143C/FFFFFF?text=Global",
      },
    ],
  };
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
