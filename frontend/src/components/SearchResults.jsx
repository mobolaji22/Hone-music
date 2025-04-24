import React from "react";

// Placeholder SearchResults component
export const SearchResults = ({ results, activeFilter }) => {
  console.log(
    "Displaying search results:",
    results,
    "with filter:",
    activeFilter
  );
  return (
    <div>
      <h2>Search Results (Placeholder)</h2>
      <p>
        Implement search results display here based on active filter:{" "}
        {activeFilter}
      </p>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default SearchResults;
