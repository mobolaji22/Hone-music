// Placeholder for library API calls

// Simulates fetching user library content based on category (tab)
export const fetchUserLibrary = async (category) => {
  console.log(`API: Fetching user library content for category: ${category}`);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Return mock data based on the category
  switch (category) {
    case "playlists":
      return [
        {
          id: "pl1",
          name: "Chill Vibes",
          creator: "User123",
          imageUrl: "https://via.placeholder.com/150/FFFF00/000000?text=Chill",
          addedAt: "2023-10-26T10:00:00Z",
        },
        {
          id: "pl2",
          name: "Workout Beats",
          creator: "Spotify",
          imageUrl:
            "https://via.placeholder.com/150/00FFFF/000000?text=Workout",
          addedAt: "2023-10-25T11:00:00Z",
        },
      ];
    case "artists":
      return [
        {
          id: "ar1",
          name: "Artist X",
          imageUrl:
            "https://via.placeholder.com/150/FFA500/FFFFFF?text=ArtistX",
          addedAt: "2023-10-24T09:30:00Z",
        },
        {
          id: "ar2",
          name: "Artist Y",
          imageUrl:
            "https://via.placeholder.com/150/800080/FFFFFF?text=ArtistY",
          addedAt: "2023-10-23T15:00:00Z",
        },
      ];
    case "albums":
      return [
        {
          id: "al1",
          title: "New Album A",
          artist: "Artist X",
          imageUrl: "https://via.placeholder.com/150/FFA500/FFFFFF?text=NewA",
          addedAt: "2023-10-24T09:30:00Z",
        },
        {
          id: "al2",
          title: "Album Two",
          artist: "Artist Y",
          imageUrl: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Album2",
          addedAt: "2023-10-20T12:00:00Z",
        },
      ];
    case "podcasts":
      return [
        {
          id: "pd1",
          title: "Tech Talk",
          publisher: "Tech Hub",
          imageUrl: "https://via.placeholder.com/150/A52A2A/FFFFFF?text=Tech",
          addedAt: "2023-10-22T08:00:00Z",
        },
        {
          id: "pd2",
          title: "Daily News",
          publisher: "News Network",
          imageUrl: "https://via.placeholder.com/150/D2691E/FFFFFF?text=News",
          addedAt: "2023-10-21T07:00:00Z",
        },
      ];
    case "tracks": // Liked Songs
      return [
        {
          id: "t1",
          title: "Song A",
          artist: "Artist X",
          album: "Album One",
          duration_ms: 180000,
          addedAt: "2023-10-26T10:00:00Z",
        },
        {
          id: "t2",
          title: "Song B",
          artist: "Artist Y",
          album: "Album Two",
          duration_ms: 240000,
          addedAt: "2023-10-25T10:05:00Z",
        },
        {
          id: "t3",
          title: "Another Tune",
          artist: "Artist Z",
          album: "Album One",
          duration_ms: 210000,
          addedAt: "2023-10-24T11:00:00Z",
        },
      ];
    default:
      return []; // Return empty array for unknown categories
  }
};

// Add other library-related API functions as needed
// e.g., addItemToLibrary, removeItemFromLibrary, etc.
