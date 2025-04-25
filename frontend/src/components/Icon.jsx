import React from "react";

// Placeholder Icon component
const Icon = ({ name, size, color }) => {
  // In a real app, you might use an icon library like react-icons
  // or render an SVG based on the name
  return (
    <span style={{ fontSize: size, color: color }} role="img" aria-label={name}>
      {/* Simple placeholder representation */}[{name}]
    </span>
  );
};

export default Icon;
