import React from "react";

// Placeholder component for displaying a grid of podcasts
export const PodcastGrid = ({ podcasts }) => {
  if (!podcasts || podcasts.length === 0) {
    return <p>No podcasts found.</p>;
  }

  return (
    <div className="grid-container podcast-grid">
      {podcasts.map((podcast) => (
        <div key={podcast.id} className="grid-item podcast-item">
          {/* Basic podcast display - replace with actual card component later */}
          <img
            src={
              podcast.imageUrl || "https://via.placeholder.com/150?text=Podcast"
            }
            alt={podcast.title}
            className="grid-item-image"
          />
          <p className="grid-item-title">{podcast.title}</p>
          <p className="grid-item-subtitle">{podcast.publisher}</p>
        </div>
      ))}
    </div>
  );
};
