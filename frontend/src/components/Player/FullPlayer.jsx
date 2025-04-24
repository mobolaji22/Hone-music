import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { usePlayerContext } from "../../contexts/PlayerContext"; // Adjust path as needed
import { fetchLyrics } from "../../api/contentService"; // Adjust path as needed
import { formatTime } from "../../utils/formatters"; // Adjust path as needed
import { Icon } from "../Icon"; // Adjust path as needed

// Placeholder for navigation hook if not using react-router-dom
const useNavigate = () => ({
  goBack: () => console.log("Navigate back"),
  navigate: (path) => console.log(`Navigate to ${path}`),
});

export const FullPlayer = () => {
  const navigate = useNavigate();
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    seekTo,
    skipNext,
    skipPrevious,
    toggleLikeTrack,
    toggleShuffle,
    toggleRepeat,
    repeatMode: contextRepeatMode, // Get repeatMode from context
    isShuffle: contextIsShuffle, // Get isShuffle from context
  } = usePlayerContext();

  const [lyrics, setLyrics] = useState(null);
  const [showLyrics, setShowLyrics] = useState(false);
  // Local state might not be needed if context manages these
  // const [repeatMode, setRepeatMode] = useState(contextRepeatMode || 'off');
  // const [isShuffle, setIsShuffle] = useState(contextIsShuffle || false);

  useEffect(() => {
    if (currentTrack?.id) {
      fetchLyrics(currentTrack.id)
        .then((data) => setLyrics(data))
        .catch((err) => console.error("Failed to load lyrics:", err));
    } else {
      setLyrics(null); // Clear lyrics if no track
    }
  }, [currentTrack?.id]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play(); // Assuming play() without args resumes or plays current track
    }
  };

  const handleRepeatToggle = () => {
    // Logic to cycle through repeat modes ('off', 'track', 'playlist')
    // This should ideally be handled within the context's toggleRepeat function
    toggleRepeat();
  };

  const handleShuffleToggle = () => {
    toggleShuffle();
  };

  const handleSeek = (event) => {
    seekTo(parseFloat(event.target.value));
  };

  if (!currentTrack) {
    // Optionally render a placeholder or return null
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        No track selected
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-red to-primary-orange text-white flex flex-col h-full p-4 z-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate.goBack()} className="p-2">
          <Icon name="chevron-down" size={24} color="#FFFFFF" />
        </button>
        <span className="font-semibold">Now Playing</span>
        <button onClick={() => navigate.navigate("Queue")} className="p-2">
          <Icon name="list" size={24} color="#FFFFFF" />
        </button>
      </div>

      {/* Album Art */}
      <div className="flex-grow flex items-center justify-center mb-4">
        <img
          src={currentTrack.albumArt || "default_album_art.png"} // Provide a fallback image
          alt={`${currentTrack.title} Album Art`}
          className="max-w-full max-h-[50vh] object-contain rounded-lg shadow-lg"
        />
      </div>

      {/* Track Info */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold truncate">{currentTrack.title}</h2>
        <p className="text-base text-text-secondary truncate">
          {currentTrack.artist}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs w-10 text-right">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime || 0}
          onChange={handleSeek} // Use onChange for live updates during drag
          // onMouseUp={handleSeek} // Or use onMouseUp/onTouchEnd if you only want update on release
          className="flex-grow h-1 bg-gray-600 rounded-full appearance-none cursor-pointer accent-green-500"
        />
        <span className="text-xs w-10 text-left">{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex justify-around items-center mb-6">
        <button onClick={handleShuffleToggle} className="p-2">
          <Icon
            name="shuffle"
            size={24}
            color={contextIsShuffle ? "#1DB954" : "#FFFFFF"}
          />
        </button>
        <button onClick={skipPrevious} className="p-2">
          <Icon name="skip-previous" size={32} color="#FFFFFF" />
        </button>
        <button
          onClick={handlePlayPause}
          className="bg-white rounded-full p-3 mx-2 shadow-lg">
          <Icon
            name={isPlaying ? "pause" : "play"}
            size={32} // Adjusted size for web
            color="#000000"
          />
        </button>
        <button onClick={skipNext} className="p-2">
          <Icon name="skip-next" size={32} color="#FFFFFF" />
        </button>
        <button onClick={handleRepeatToggle} className="p-2">
          <Icon
            name={contextRepeatMode === "track" ? "repeat-one" : "repeat"}
            size={24}
            color={contextRepeatMode !== "off" ? "#1DB954" : "#FFFFFF"}
          />
        </button>
      </div>

      {/* Actions */}
      <div className="flex justify-around items-center mb-4">
        <button
          onClick={() => toggleLikeTrack(currentTrack.id)}
          className="p-2">
          <Icon
            name={currentTrack.isLiked ? "favorite" : "favorite-border"}
            size={24}
            color={currentTrack.isLiked ? "#1DB954" : "#FFFFFF"}
          />
        </button>
        <button
          onClick={() =>
            navigate.navigate("AddToPlaylist", { trackId: currentTrack.id })
          }
          className="p-2">
          <Icon name="playlist-add" size={24} color="#FFFFFF" />
        </button>
        <button
          onClick={() =>
            navigate.navigate("Share", { trackId: currentTrack.id })
          }
          className="p-2">
          <Icon name="share" size={24} color="#FFFFFF" />
        </button>
        <button onClick={() => setShowLyrics(!showLyrics)} className="p-2">
          <Icon
            name="lyrics"
            size={24}
            color={showLyrics ? "#1DB954" : "#FFFFFF"}
          />
        </button>
      </div>

      {/* Lyrics (Conditional) */}
      {showLyrics && lyrics && (
        <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-black bg-opacity-70 p-4 overflow-y-auto">
          <button
            onClick={() => setShowLyrics(false)}
            className="absolute top-2 right-2 text-white">
            Close
          </button>
          <pre className="text-sm whitespace-pre-wrap">
            {lyrics.text || "Lyrics not available."}
          </pre>
        </div>
      )}
    </div>
  );
};
