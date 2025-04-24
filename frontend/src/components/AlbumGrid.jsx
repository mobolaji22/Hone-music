import React from "react";

// Placeholder component for displaying a grid of albums
export const AlbumGrid = ({ albums }) => {
  if (!albums || albums.length === 0) {
    return <p>No albums found.</p>;
  }

  return (
    <div className="grid-container album-grid">
      {albums.map((album) => (
        <div key={album.id} className="grid-item album-item">
          {/* Basic album display - replace with actual card component later */}
          <img
            src={album.imageUrl || "https://via.placeholder.com/150?text=Album"}
            alt={album.title}
            className="grid-item-image"
          />
          <p className="grid-item-title">{album.title}</p>
          <p className="grid-item-subtitle">{album.artist}</p>
        </div>
      ))}
    </div>
  );
};
