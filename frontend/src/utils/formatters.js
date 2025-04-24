// Placeholder for utility functions

/**
 * Formats time in seconds to a MM:SS string.
 * @param {number} seconds - The time in seconds.
 * @returns {string} The formatted time string (e.g., "01:23").
 */
export const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

// Add other formatting functions as needed

/**
 * Formats a timestamp into a relative time string (e.g., "5 minutes ago").
 * @param {number} timestamp - The timestamp in milliseconds since epoch.
 * @returns {string} The relative time string.
 */
export const formatRelativeTime = (timestamp) => {
  const now = Date.now();
  const secondsPast = (now - timestamp) / 1000;

  if (secondsPast < 60) {
    return `${Math.round(secondsPast)} seconds ago`;
  } else if (secondsPast < 3600) {
    return `${Math.round(secondsPast / 60)} minutes ago`;
  } else if (secondsPast <= 86400) {
    return `${Math.round(secondsPast / 3600)} hours ago`;
  } else {
    const days = Math.round(secondsPast / 86400);
    if (days === 1) {
      return "Yesterday";
    } else if (days <= 7) {
      return `${days} days ago`;
    } else {
      // For older dates, you might want to return the actual date
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    }
  }
};
