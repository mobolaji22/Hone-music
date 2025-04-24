import React from "react";

export const LibraryTabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="library-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};
