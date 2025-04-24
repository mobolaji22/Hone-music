// Mock API service for user settings

// Simulate fetching user settings
export const getUserSettings = async () => {
  console.log("API: Fetching user settings...");
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock settings data (similar structure to SettingsPage initial state)
  return {
    audio: {
      quality: "high",
      equalizer: {
        enabled: true,
        presets: "rock",
        bands: [
          { frequency: "32Hz", gain: 2 },
          { frequency: "64Hz", gain: 1 },
          { frequency: "125Hz", gain: 0 },
          { frequency: "250Hz", gain: -1 },
          { frequency: "500Hz", gain: -2 },
          { frequency: "1kHz", gain: 0 },
          { frequency: "2kHz", gain: 1 },
          { frequency: "4kHz", gain: 2 },
          { frequency: "8kHz", gain: 3 },
          { frequency: "16kHz", gain: 4 },
        ],
      },
      normalization: false,
      crossfade: 5, // 5 seconds
    },
    downloads: {
      quality: "high",
      useWifiOnly: false,
      autoDownload: {
        enabled: true,
        playlists: ["playlist_id_1", "playlist_id_3"],
      },
    },
    privacy: {
      shareListeningActivity: false,
      privateSession: true,
      showCollections: false,
    },
    accessibility: {
      reduceAnimations: true,
      highContrast: false,
      largeText: true,
      monoAudio: true,
      screenReader: "voiceover",
    },
    notifications: {
      newMusic: false,
      playlistUpdates: true,
      artistUpdates: false,
      promotional: true,
    },
  };
};

// Simulate updating user settings
export const updateUserSettings = async (category, settingsUpdate) => {
  console.log(
    `API: Updating user settings for category: ${category}`,
    settingsUpdate
  );
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Simulate potential API error
  // if (Math.random() > 0.8) { // 20% chance of error
  //   console.error('API Error: Failed to update settings');
  //   throw new Error('Failed to update settings');
  // }

  console.log("API: Settings updated successfully.");
  // In a real API, you might return the updated settings or just a success status
  return { success: true };
};
