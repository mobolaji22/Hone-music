import React from "react";

// Placeholder component for displaying a grid of playlists
export const PlaylistGrid = ({ playlists }) => {
  if (!playlists || playlists.length === 0) {
    return <p>No playlists found.</p>;
  }

  return (
    <div className="grid-container playlist-grid">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="grid-item playlist-item">
          {/* Basic playlist display - replace with actual card component later */}
          <img
            src={
              playlist.imageUrl ||
              "https://via.placeholder.com/150?text=Playlist"
            }
            alt={playlist.name}
            className="grid-item-image"
          />
          <p className="grid-item-title">{playlist.name}</p>
          <p className="grid-item-subtitle">{playlist.creator || "Playlist"}</p>
        </div>
      ))}
    </div>
  );
};
