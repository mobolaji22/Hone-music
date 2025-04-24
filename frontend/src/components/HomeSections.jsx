import React from "react";

// Placeholder Section Component (Generic structure)
const Section = ({ title, data, onItemPress, children }) => {
  if (!data || data.length === 0) {
    return null; // Don't render if no data
  }

  return (
    <section style={{ margin: "20px 0" }}>
      <h2>{title}</h2>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "10px",
          padding: "10px 0",
        }}>
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemPress(item)}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              minWidth: "150px",
              cursor: "pointer",
            }}>
            {/* Basic item display - customize as needed */}
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title || "Item image"}
                style={{ width: "100%", height: "auto", marginBottom: "5px" }}
              />
            )}
            <strong>{item.title || "Untitled"}</strong>
            {item.artist && <p>{item.artist}</p>}
            {/* Render custom children if provided */}
            {children && children(item)}
          </div>
        ))}
      </div>
    </section>
  );
};

// Placeholder PersonalizedSection component
export const PersonalizedSection = ({ title, data, onItemPress }) => {
  return <Section title={title} data={data} onItemPress={onItemPress} />;
};

// Placeholder TrendingSection component
export const TrendingSection = ({ title, data, onItemPress }) => {
  return <Section title={title} data={data} onItemPress={onItemPress} />;
};

// Placeholder RecentlyPlayedSection component
export const RecentlyPlayedSection = ({ data, onItemPress }) => {
  return (
    <Section title="Recently Played" data={data} onItemPress={onItemPress} />
  );
};
