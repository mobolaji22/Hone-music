import React, { useState, useEffect } from "react";
import { fetchUserLibrary } from "../api/libraryService";
import { LibraryTabs } from "../components/LibraryTabs";
import { AlbumGrid } from "../components/AlbumGrid";
import { ArtistGrid } from "../components/ArtistGrid";
import { PlaylistGrid } from "../components/PlaylistGrid";
import { PodcastGrid } from "../components/PodcastGrid";
import { TrackList } from "../components/TrackList";
import Icon from "../components/Icon";
import { Spinner } from "../components/Spinner";
import "../styles/library.css";

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState("playlists");
  const [libraryContent, setLibraryContent] = useState({
    playlists: [],
    artists: [],
    albums: [],
    podcasts: [],
    tracks: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("recent"); // recent, name, creator, etc.
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const loadLibrary = async () => {
      try {
        setIsLoading(true);
        // Simulate fetching data for the active tab
        // In a real app, fetchUserLibrary would likely take the tab ID
        const data = await fetchUserLibrary(activeTab);
        setLibraryContent((prev) => ({
          ...prev,
          [activeTab]: data,
        }));
      } catch (error) {
        console.error(`Failed to load ${activeTab}:`, error);
        // Handle error state, maybe show a message to the user
        setLibraryContent((prev) => ({ ...prev, [activeTab]: [] })); // Clear content on error
      } finally {
        setIsLoading(false);
      }
    };

    loadLibrary();
  }, [activeTab]);

  const filteredContent =
    libraryContent[activeTab]?.filter((item) => {
      const searchTerms = filterText.toLowerCase();
      if (!searchTerms) return true;

      // Adjust filtering based on item properties for each tab
      switch (activeTab) {
        case "playlists":
          return (
            item.name?.toLowerCase().includes(searchTerms) ||
            item.creator?.toLowerCase().includes(searchTerms)
          );
        case "artists":
          return item.name?.toLowerCase().includes(searchTerms);
        case "albums":
          return (
            item.title?.toLowerCase().includes(searchTerms) ||
            item.artist?.toLowerCase().includes(searchTerms)
          );
        case "podcasts":
          return (
            item.title?.toLowerCase().includes(searchTerms) ||
            item.publisher?.toLowerCase().includes(searchTerms)
          );
        case "tracks": // Assuming 'tracks' corresponds to 'Liked Songs'
          return (
            item.title?.toLowerCase().includes(searchTerms) ||
            item.artist?.toLowerCase().includes(searchTerms) ||
            item.album?.toLowerCase().includes(searchTerms)
          );
        default:
          return true;
      }
    }) || []; // Ensure filteredContent is always an array

  const sortedContent = [...filteredContent].sort((a, b) => {
    switch (sortOption) {
      case "recent":
        // Ensure addedAt exists and is valid before comparing
        const dateA = a.addedAt ? new Date(a.addedAt) : 0;
        const dateB = b.addedAt ? new Date(b.addedAt) : 0;
        return dateB - dateA;
      case "name":
        const nameA = a.name || a.title || "";
        const nameB = b.name || b.title || "";
        return nameA.localeCompare(nameB);
      case "creator":
        const creatorA = a.creator || a.artist || a.publisher || "";
        const creatorB = b.creator || b.artist || b.publisher || "";
        return creatorA.localeCompare(creatorB);
      default:
        return 0;
    }
  });

  return (
    <div className="library-page">
      <div className="library-header">
        <h1>Your Library</h1>

        <div className="library-tools">
          <input
            type="text"
            className="filter-input"
            placeholder={`Filter ${activeTab}...`}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />

          <select
            className="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}>
            <option value="recent">Recently Added</option>
            <option value="name">Alphabetical</option>
            {/* Conditionally render Creator option based on tab */}
            {(activeTab === "playlists" ||
              activeTab === "albums" ||
              activeTab === "artists" ||
              activeTab === "podcasts") && (
              <option value="creator">Creator/Artist/Publisher</option>
            )}
          </select>
        </div>

        <LibraryTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={[
            { id: "playlists", label: "Playlists" },
            { id: "artists", label: "Artists" },
            { id: "albums", label: "Albums" },
            { id: "podcasts", label: "Podcasts" },
            { id: "tracks", label: "Liked Songs" }, // Changed from 'tracks' to 'Liked Songs' for label
          ]}
        />
      </div>

      <div className="library-content">
        {isLoading ? (
          <div className="loading-spinner">
            <Spinner />
          </div>
        ) : sortedContent.length === 0 ? (
          <div className="empty-library">
            {/* Use a relevant icon */}
            <Icon name="library-music" size={64} />
            <h2>Nothing in {activeTab} yet</h2>
            <p>Items you add to Your Library will appear here.</p>
          </div>
        ) : activeTab === "playlists" ? (
          <PlaylistGrid playlists={sortedContent} />
        ) : activeTab === "artists" ? (
          <ArtistGrid artists={sortedContent} />
        ) : activeTab === "albums" ? (
          <AlbumGrid albums={sortedContent} />
        ) : activeTab === "podcasts" ? (
          <PodcastGrid podcasts={sortedContent} />
        ) : activeTab === "tracks" ? ( // Render TrackList for 'Liked Songs'
          <TrackList
            tracks={sortedContent}
            showAlbum={true}
            showAddedDate={true}
            // Add necessary props for TrackList, e.g., onTrackPlay
          />
        ) : null}
      </div>
    </div>
  );
};

export default LibraryPage;
