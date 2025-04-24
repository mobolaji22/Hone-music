// Placeholder for search API calls

// Simulates searching content across different types
export const searchContent = async (query, filter = "all") => {
  console.log(`API: Searching for "${query}" with filter: ${filter}`);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Mock results - in a real app, this would hit your backend API
  const mockResults = {
    tracks: [
      {
        id: "st1",
        title: `Song about ${query} 1`,
        artist: "Search Artist A",
        album: "Search Album X",
      },
      {
        id: "st2",
        title: `Track ${query}`,
        artist: "Search Artist B",
        album: "Search Album Y",
      },
    ],
    albums: [
      { id: "sa1", title: `Album ${query} Hits`, artist: "Various Artists" },
      { id: "sa2", title: `${query} Collection`, artist: "Search Artist C" },
    ],
    artists: [
      { id: "sar1", name: `Artist ${query} Band` },
      { id: "sar2", name: `DJ ${query}` },
    ],
    playlists: [
      { id: "sp1", name: `Playlist for ${query}`, owner: "User McSearch" },
      { id: "sp2", name: `${query} Vibes`, owner: "Community" },
    ],
    podcasts: [
      {
        id: "spo1",
        title: `Podcast on ${query}`,
        publisher: "Search Pods Inc.",
      },
      { id: "spo2", title: `The ${query} Show`, publisher: "Talks Ltd." },
    ],
  };

  // Filter results based on the active filter
  if (filter === "all") {
    return mockResults;
  } else if (mockResults[filter]) {
    // Return only the specific type requested
    const filteredResults = {
      tracks: [],
      albums: [],
      artists: [],
      playlists: [],
      podcasts: [],
    };
    filteredResults[filter] = mockResults[filter];
    return filteredResults;
  } else {
    // Invalid filter type
    return { tracks: [], albums: [], artists: [], playlists: [], podcasts: [] };
  }
};
