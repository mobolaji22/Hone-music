import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { SpotifyService } from "../services/spotifyApi";

// Create the context
const PlayerContext = createContext();

// Create a provider component
export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState(null);

  useEffect(() => {
    // Initialize audio element
    const audio = new Audio();
    setAudioElement(audio);

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Function to play a track
  const play = useCallback(
    async (track) => {
      try {
        console.log("Context: Playing track", track);

        // Fetch track details from Spotify
        const trackData = await SpotifyService.getTrack(track.id);
        const previewUrl = trackData.tracks?.[0]?.preview_url;

        if (previewUrl && audioElement) {
          // Stop current track if playing
          if (audioElement.src) {
            audioElement.pause();
            audioElement.src = "";
          }

          // Set up new track
          audioElement.src = previewUrl;
          audioElement.play();
          setCurrentTrack(track);
          setIsPlaying(true);
        } else {
          console.warn("No preview URL available for this track");
        }
      } catch (error) {
        console.error("Error playing track:", error);
      }
    },
    [audioElement]
  );

  // Function to pause
  const pause = useCallback(() => {
    console.log("Context: Pausing track");
    if (audioElement) {
      audioElement.pause();
      setIsPlaying(false);
    }
  }, [audioElement]);

  // Function to resume
  const resume = useCallback(() => {
    if (currentTrack && audioElement) {
      console.log("Context: Resuming track");
      audioElement.play();
      setIsPlaying(true);
    }
  }, [currentTrack, audioElement]);

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
