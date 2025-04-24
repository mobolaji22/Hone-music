import React from "react";

// Placeholder BottomTabBar component
export const BottomTabBar = ({ currentTab, navigation }) => {
  const handleNavigation = (tab) => {
    console.log(`Navigating to ${tab}`);
    // In a real app with react-router-dom, you might use:
    // navigation(`/${tab.toLowerCase()}`);
  };

  return (
    <nav
      className="bottom-tab-bar" // Add a class for styling
      style={{
        borderTop: "1px solid #ccc",
        padding: "10px",
        justifyContent: "space-around",
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#eee",
      }}>
      <button
        onClick={() => handleNavigation("Home")}
        style={{ fontWeight: currentTab === "Home" ? "bold" : "normal" }}>
        Home
      </button>
      <button
        onClick={() => handleNavigation("Search")}
        style={{ fontWeight: currentTab === "Search" ? "bold" : "normal" }}>
        Search
      </button>
      <button
        onClick={() => handleNavigation("Library")}
        style={{ fontWeight: currentTab === "Library" ? "bold" : "normal" }}>
        Library
      </button>
      {/* Add other tabs as needed */}
    </nav>
  );
};
