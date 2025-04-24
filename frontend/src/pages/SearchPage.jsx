import React, { useState, useEffect, useRef } from "react";
import { SpeechRecognition } from "../utils/speechRecognition";
import { searchContent } from "../api/searchService";
import { SearchResults } from "../components/SearchResults";
import { FilterTabs } from "../components/FilterTabs";
import { Icon } from "../components/Icon";
import { Spinner } from "../components/Spinner";
import { formatRelativeTime } from "../utils/formatters";
import "../styles/search.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState({
    tracks: [],
    albums: [],
    artists: [],
    playlists: [],
    podcasts: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchTimeout = useRef(null);
  const speechRecognition = useRef(null);

  useEffect(() => {
    // Initialize speech recognition
    speechRecognition.current = new SpeechRecognition();
    speechRecognition.current.onResult = (transcript) => {
      setQuery(transcript);
      setIsListening(false);
    };

    speechRecognition.current.onError = () => {
      setIsListening(false);
    };

    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      setIsLoading(true);
      searchTimeout.current = setTimeout(async () => {
        try {
          const searchResults = await searchContent(query, activeFilter);
          setResults(searchResults);

          // Add to recent searches if not already there
          if (query.trim().length > 2) {
            const updatedSearches = [
              { query, timestamp: Date.now() },
              ...recentSearches.filter((item) => item.query !== query),
            ].slice(0, 10);

            setRecentSearches(updatedSearches);
            localStorage.setItem(
              "recentSearches",
              JSON.stringify(updatedSearches)
            );
          }
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setResults({
        tracks: [],
        albums: [],
        artists: [],
        playlists: [],
        podcasts: [],
      });
    }
  }, [query, activeFilter]);

  const handleVoiceSearch = () => {
    if (isListening) {
      speechRecognition.current.stop();
      setIsListening(false);
    } else {
      speechRecognition.current.start();
      setIsListening(true);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
  };

  const handleUseRecentSearch = (search) => {
    setQuery(search.query);
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for songs, artists, albums..."
            autoFocus
          />

          {query.length > 0 && (
            <button className="clear-button" onClick={handleClearSearch}>
              <Icon name="close" />
            </button>
          )}

          <button
            className={`voice-search-button ${isListening ? "listening" : ""}`}
            onClick={handleVoiceSearch}>
            <Icon name="mic" />
          </button>
        </div>

        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filters={[
            { id: "all", label: "All" },
            { id: "tracks", label: "Songs" },
            { id: "albums", label: "Albums" },
            { id: "artists", label: "Artists" },
            { id: "playlists", label: "Playlists" },
            { id: "podcasts", label: "Podcasts" },
          ]}
        />
      </div>

      <div className="search-content">
        {isLoading ? (
          <div className="loading-spinner">
            <Spinner />
          </div>
        ) : query.trim() === "" ? (
          <div className="recent-searches">
            <h2>Recent Searches</h2>
            {recentSearches.length > 0 ? (
              <ul className="recent-search-list">
                {recentSearches.map((search, index) => (
                  <li
                    key={index}
                    className="recent-search-item"
                    onClick={() => handleUseRecentSearch(search)}>
                    <Icon name="history" />
                    <span>{search.query}</span>
                    <span className="recent-time">
                      {formatRelativeTime(search.timestamp)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-recent">No recent searches</p>
            )}
          </div>
        ) : (
          <SearchResults results={results} activeFilter={activeFilter} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
