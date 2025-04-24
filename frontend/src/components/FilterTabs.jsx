import React from "react";

// Placeholder FilterTabs component
export const FilterTabs = ({ activeFilter, onFilterChange, filters }) => {
  console.log("Rendering FilterTabs with active filter:", activeFilter);
  return (
    <div className="filter-tabs">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`filter-tab ${activeFilter === filter.id ? "active" : ""}`}
          onClick={() => onFilterChange(filter.id)}>
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
