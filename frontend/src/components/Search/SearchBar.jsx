import React from "react";

// Placeholder SearchBar component
export const SearchBar = ({ onFocus }) => {
  return (
    <div style={{ padding: "10px" }}>
      <input
        type="text"
        placeholder="Search songs, artists, playlists..."
        onFocus={onFocus}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};
