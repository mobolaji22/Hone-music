import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation

// Updated BottomTabBar component using react-router-dom
export const BottomTabBar = () => {
  const location = useLocation(); // Get current location
  const currentPath = location.pathname;

  // Helper function to determine if a tab is active
  const isActive = (path) => currentPath === path;

  return (
    <nav
      className="bottom-tab-bar bg-[var(--glass-bg)] backdrop-blur-md border-t border-[var(--glass-border)] shadow-md flex justify-around items-center p-2 fixed bottom-0 left-0 right-0 z-10"
      // Removed inline styles, prefer Tailwind classes
    >
      <Link
        to="/"
        className={`flex flex-col items-center text-[var(--text-secondary)] hover:text-[var(--primary-red)] ${
          isActive("/") ? "text-[var(--primary-red)] font-bold" : ""
        }`}>
        {/* Replace with Icon component if available */}
        <span>Home</span>
      </Link>
      <Link
        to="/search"
        className={`flex flex-col items-center text-[var(--text-secondary)] hover:text-[var(--primary-red)] ${
          isActive("/search") ? "text-[var(--primary-red)] font-bold" : ""
        }`}>
        {/* Replace with Icon component if available */}
        <span>Search</span>
      </Link>
      <Link
        to="/library"
        className={`flex flex-col items-center text-[var(--text-secondary)] hover:text-[var(--primary-red)] ${
          isActive("/library") ? "text-[var(--primary-red)] font-bold" : ""
        }`}>
        {/* Replace with Icon component if available */}
        <span>Library</span>
      </Link>
      {/* Add other tabs as needed using Link */}
    </nav>
  );
};
