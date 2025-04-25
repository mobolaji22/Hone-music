import React from "react";
import { usePlayerContext } from "../../contexts/PlayerContext"; // Adjust path as needed
import Icon from "../Icon"; // Adjust path as needed

export const MiniPlayer = ({ onPress }) => {
  const { currentTrack, isPlaying, play, pause } = usePlayerContext();

  const handlePlayPause = (e) => {
    e.stopPropagation(); // Prevent triggering the main onPress when clicking the button
    if (isPlaying) {
      pause();
    } else {
      play(); // Assuming play() resumes or plays the current track
    }
  };

  if (!currentTrack) {
    return null; // Don't render if no track is playing
  }

  return (
    <div
      onClick={onPress} // Navigate to FullPlayer when the container is clicked
      className="fixed bottom-12 left-0 right-0 bg-neutral-800 text-white p-2 flex items-center justify-between cursor-pointer border-t border-neutral-700 z-40 md:bottom-0 md:left-64" // Adjusted for potential sidebar
      style={{ height: "60px" }} // Fixed height for the mini player
    >
      <div className="flex items-center space-x-3">
        <img
          src={currentTrack.albumArt || "default_album_art.png"} // Fallback image
          alt={`${currentTrack.title} Album Art`}
          className="w-10 h-10 rounded object-cover"
        />
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-medium truncate">
            {currentTrack.title}
          </span>
          <span className="text-xs text-neutral-400 truncate">
            {currentTrack.artist}
          </span>
        </div>
      </div>

      <button
        onClick={handlePlayPause}
        className="p-2 rounded-full hover:bg-neutral-700">
        <Icon name={isPlaying ? "pause" : "play"} size={24} color="#FFFFFF" />
      </button>
    </div>
  );
};
