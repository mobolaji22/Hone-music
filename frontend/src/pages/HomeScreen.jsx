import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Icon from "../components/Icon"; // Placeholder
import { BottomTabBar } from "../components/Navigation/BottomTabBar"; // Placeholder
import { MiniPlayer } from "../components/Player/MiniPlayer"; // Placeholder
import {
  fetchPersonalizedContent,
  fetchTrendingContent,
} from "../api/contentService"; // Placeholder
import { usePlayerContext } from "../contexts/PlayerContext"; // Placeholder
import { SearchBar } from "../components/Search/SearchBar";
import {
  PersonalizedSection,
  TrendingSection,
  RecentlyPlayedSection,
} from "../components/HomeSections"; // Placeholders

const HomeScreen = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [personalizedContent, setPersonalizedContent] = useState({
    dailyMixes: [],
    recentlyPlayed: [],
    recommendedPlaylists: [],
  });
  const [trendingContent, setTrendingContent] = useState({
    newReleases: [],
    trendingTracks: [],
    popularPlaylists: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { currentTrack, isPlaying, play } = usePlayerContext(); // Assuming play function exists

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        // Simulate API calls
        const personalized = await fetchPersonalizedContent();
        const trending = await fetchTrendingContent();

        setPersonalizedContent(personalized);
        setTrendingContent(trending);
      } catch (error) {
        console.error("Failed to load content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleSearchFocus = () => {
    navigate("/search"); // Navigate to search page
    // console.log("Navigate to search"); // Placeholder action removed
  };

  const handleItemPress = (type, id) => {
    navigate(`/${type.toLowerCase()}/${id}`); // Use navigate, ensure type is lowercase for path consistency
    // console.log(`Navigate to ${type} with id ${id}`); // Placeholder action removed
  };

  const handleTrackPress = (item) => {
    play(item); // Play the track using context
    console.log("Playing track:", item); // Placeholder action
  };

  return (
    <div /* style={styles.container} */>
      {" "}
      {/* Using div instead of SafeAreaView */}
      <header /* style={styles.header} */>
        {" "}
        {/* Using header tag */}
        <h1 /* style={styles.greeting} */>Good afternoon</h1>
        <div /* style={styles.headerIcons} */>
          <button
            onClick={() =>
              console.log("Navigate to Notifications")
            } /* style={styles.iconButton} */
          >
            {" "}
            {/* Using button */}
            <Icon name="notifications" size={24} color="#FFFFFF" />
          </button>
          <button
            onClick={() =>
              console.log("Navigate to Settings")
            } /* style={styles.iconButton} */
          >
            {" "}
            {/* Using button */}
            <Icon name="settings" size={24} color="#FFFFFF" />
          </button>
        </div>
      </header>
      <SearchBar onFocus={handleSearchFocus} />
      <main /* style={styles.content} */>
        {" "}
        {/* Using main tag */}
        {isLoading ? (
          <div>Loading...</div> /* Simple loading indicator */
        ) : (
          <>
            <RecentlyPlayedSection
              data={personalizedContent.recentlyPlayed}
              onItemPress={(item) => handleItemPress("Album", item.id)}
            />

            <PersonalizedSection
              title="Made For You"
              data={personalizedContent.dailyMixes}
              onItemPress={(item) => handleItemPress("Playlist", item.id)}
            />

            <TrendingSection
              title="New Releases"
              data={trendingContent.newReleases}
              onItemPress={(item) => handleItemPress("Album", item.id)}
            />

            <PersonalizedSection
              title="Your Playlists"
              data={personalizedContent.recommendedPlaylists}
              onItemPress={(item) => handleItemPress("Playlist", item.id)}
            />

            <TrendingSection
              title="Trending Now"
              data={trendingContent.trendingTracks}
              onItemPress={handleTrackPress}
            />
          </>
        )}
      </main>
      {currentTrack && (
        <MiniPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          onPress={() => navigate("/player")} // Navigate to a player route (assuming '/player' exists or will be added)
        />
      )}
      <BottomTabBar />{" "}
      {/* Remove props, BottomTabBar now handles its state/navigation */}
    </div>
  );
};

export default HomeScreen;
