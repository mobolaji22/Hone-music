import axios from "axios";

const SPOTIFY_API_BASE = "https://spotify23.p.rapidapi.com";

// API configuration
const apiConfig = {
  headers: {
    "x-rapidapi-key":
      import.meta.env.VITE_RAPIDAPI_KEY ||
      "63434cc2b0mshf8eee09423bc8cfp1df962jsn0377ab9e3079",
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  },
};

// Rate limiting configuration
const rateLimitConfig = {
  maxRetries: 3,
  initialRetryDelay: 1000,
  maxRetryDelay: 10000,
  backoffFactor: 2,
};

// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const getCacheKey = (config) => {
  return `${config.url}${JSON.stringify(config.params || {})}`;
};

const isCacheValid = (cacheEntry) => {
  return cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_TTL;
};

// Create axios instance with retry interceptor
const spotifyApi = axios.create({
  baseURL: SPOTIFY_API_BASE,
  ...apiConfig,
});

// Add request interceptor for caching
spotifyApi.interceptors.request.use(
  async (config) => {
    if (config.method !== "get") return config;

    const cacheKey = getCacheKey(config);
    const cacheEntry = cache.get(cacheKey);

    if (isCacheValid(cacheEntry)) {
      return {
        ...config,
        adapter: () =>
          Promise.resolve({
            data: cacheEntry.data,
            status: 200,
            statusText: "OK",
            headers: cacheEntry.headers,
            config: config,
            request: null,
          }),
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for caching
spotifyApi.interceptors.response.use(
  (response) => {
    if (response.config.method === "get") {
      const cacheKey = getCacheKey(response.config);
      cache.set(cacheKey, {
        data: response.data,
        headers: response.headers,
        timestamp: Date.now(),
      });
    }
    return response;
  },
  async (error) => {
    const { config, response } = error;

    if (
      !config ||
      !response ||
      response.status !== 429 ||
      config.retryCount >= rateLimitConfig.maxRetries
    ) {
      return Promise.reject(error);
    }

    config.retryCount = config.retryCount || 0;
    config.retryCount += 1;

    const retryDelay = Math.min(
      rateLimitConfig.initialRetryDelay *
        Math.pow(rateLimitConfig.backoffFactor, config.retryCount - 1),
      rateLimitConfig.maxRetryDelay
    );

    await new Promise((resolve) => setTimeout(resolve, retryDelay));
    return spotifyApi(config);
  }
);

// Add response interceptor for handling rate limits
spotifyApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (
      !config ||
      !response ||
      response.status !== 429 ||
      config.retryCount >= rateLimitConfig.maxRetries
    ) {
      return Promise.reject(error);
    }

    config.retryCount = config.retryCount || 0;
    config.retryCount += 1;

    const retryDelay = Math.min(
      rateLimitConfig.initialRetryDelay *
        Math.pow(rateLimitConfig.backoffFactor, config.retryCount - 1),
      rateLimitConfig.maxRetryDelay
    );

    await new Promise((resolve) => setTimeout(resolve, retryDelay));
    return spotifyApi(config);
  }
);

// API endpoints
export const SpotifyService = {
  // Get artist's albums
  getArtistAlbums: async (artistId, options = {}) => {
    try {
      const params = {
        id: artistId,
        offset: "0",
        limit: "20",
        ...options,
      };
      const response = await spotifyApi.get("/artist_albums/", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching artist albums:", error);
      throw error;
    }
  },

  // Get artist's top tracks
  getArtistTopTracks: async (artistId) => {
    try {
      const response = await spotifyApi.get("/artist_top_tracks/", {
        params: { id: artistId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching artist top tracks:", error);
      throw error;
    }
  },

  // Get related artists
  getRelatedArtists: async (artistId) => {
    try {
      const response = await spotifyApi.get("/artist_related/", {
        params: { id: artistId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching related artists:", error);
      throw error;
    }
  },

  // Get user's playlists with fallback to featured playlists
  getUserPlaylists: async (userId, options = {}) => {
    try {
      // First try to get featured playlists as they don't require auth
      const params = {
        q: "top playlist",
        type: "playlist",
        offset: "0",
        limit: "20",
        ...options,
      };
      const response = await spotifyApi.get("/search/", { params });

      if (response.data.playlists?.items) {
        return {
          items: response.data.playlists.items,
          total:
            response.data.playlists.total ||
            response.data.playlists.items.length,
          source: "featured",
        };
      }

      // If no playlists found, return a curated selection
      return {
        items: [
          {
            id: "featured_1",
            name: "Top Hits",
            description: "The hottest tracks right now",
            images: [{ url: "https://via.placeholder.com/300" }],
          },
          {
            id: "featured_2",
            name: "Discover Weekly",
            description: "Your weekly music mix",
            images: [{ url: "https://via.placeholder.com/300" }],
          },
        ],
        total: 2,
        source: "fallback",
      };
    } catch (error) {
      console.error("Error fetching playlists:", error);
      // Return curated fallback content
      return {
        items: [
          {
            id: "fallback_1",
            name: "Popular Hits",
            description: "Chart-topping tracks",
            images: [{ url: "https://via.placeholder.com/300" }],
          },
        ],
        total: 1,
        source: "error_fallback",
        error:
          "Unable to fetch playlists. Showing recommended content instead.",
      };
    }
  },

  // Get playlist details
  getPlaylist: async (playlistId) => {
    try {
      const response = await spotifyApi.get("/playlist/", {
        params: { id: playlistId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching playlist:", error);
      throw error;
    }
  },

  // Get playlist tracks
  getPlaylistTracks: async (playlistId, options = {}) => {
    try {
      const params = {
        id: playlistId,
        offset: "0",
        limit: "100",
        ...options,
      };
      const response = await spotifyApi.get("/playlist_tracks/", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching playlist tracks:", error);
      throw error;
    }
  },
  // Get track details
  getTrack: async (trackId) => {
    try {
      const response = await spotifyApi.get("/tracks/", {
        params: { ids: trackId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching track:", error);
      throw error;
    }
  },

  // Search across Spotify
  search: async (query, options = {}) => {
    try {
      const params = {
        type: "multi",
        offset: "0",
        limit: "10",
        numberOfTopResults: "5",
        ...options,
      };
      const response = await spotifyApi.get("/search/", { params });
      return response.data;
    } catch (error) {
      console.error("Error searching:", error);
      throw error;
    }
  },

  // Get album details
  getAlbum: async (albumId) => {
    try {
      const response = await spotifyApi.get("/albums/", {
        params: { ids: albumId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching album:", error);
      throw error;
    }
  },

  // Get album tracks
  getAlbumTracks: async (albumId, options = {}) => {
    try {
      const params = {
        id: albumId,
        offset: "0",
        limit: "300",
        ...options,
      };
      const response = await spotifyApi.get("/album_tracks/", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching album tracks:", error);
      throw error;
    }
  },

  // Get album metadata
  getAlbumMetadata: async (albumId) => {
    try {
      const response = await spotifyApi.get("/album_metadata/", {
        params: { id: albumId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching album metadata:", error);
      throw error;
    }
  },

  // Get artist details
  getArtist: async (artistId) => {
    try {
      const response = await spotifyApi.get("/artists/", {
        params: { ids: artistId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching artist:", error);
      throw error;
    }
  },
};
