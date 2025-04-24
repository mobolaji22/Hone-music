import React, { createContext, useState, useContext, useCallback } from "react";

// Create the context
const PlayerContext = createContext();

// Create a provider component
export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null); // Example: { id: 'tt1', title: 'Viral Hit 1', artist: 'Singer Z' }
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to play a track
  const play = useCallback((track) => {
    console.log("Context: Playing track", track);
    setCurrentTrack(track);
    setIsPlaying(true);
    // Add actual audio playback logic here in a real app
  }, []);

  // Function to pause
  const pause = useCallback(() => {
    console.log("Context: Pausing track");
    setIsPlaying(false);
    // Add actual audio pause logic here
  }, []);

  // Function to resume
  const resume = useCallback(() => {
    if (currentTrack) {
      console.log("Context: Resuming track");
      setIsPlaying(true);
      // Add actual audio resume logic here
    }
  }, [currentTrack]);

  const value = {
    currentTrack,
    isPlaying,
    play,
    pause,
    resume,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

// Custom hook to use the PlayerContext
export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};
