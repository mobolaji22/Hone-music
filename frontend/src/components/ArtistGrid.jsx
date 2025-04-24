import React from "react";

// Placeholder component for displaying a grid of artists
export const ArtistGrid = ({ artists }) => {
  if (!artists || artists.length === 0) {
    return <p>No artists found.</p>;
  }

  return (
    <div className="grid-container artist-grid">
      {artists.map((artist) => (
        <div key={artist.id} className="grid-item artist-item">
          {/* Basic artist display - replace with actual card component later */}
          <img
            src={
              artist.imageUrl || "https://via.placeholder.com/150?text=Artist"
            }
            alt={artist.name}
            className="grid-item-image artist-image"
          />
          <p className="grid-item-title">{artist.name}</p>
        </div>
      ))}
    </div>
  );
};
