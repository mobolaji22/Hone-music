import React, { useState, useEffect } from "react";
import { getUserSettings, updateUserSettings } from "../api/userService";
import { Spinner } from "../components/Spinner"; // Assuming Spinner component exists
import "../styles/settings.css";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    audio: {
      quality: "auto",
      equalizer: {
        enabled: false,
        presets: "custom",
        bands: [
          { frequency: "32Hz", gain: 0 },
          { frequency: "64Hz", gain: 0 },
          { frequency: "125Hz", gain: 0 },
          { frequency: "250Hz", gain: 0 },
          { frequency: "500Hz", gain: 0 },
          { frequency: "1kHz", gain: 0 },
          { frequency: "2kHz", gain: 0 },
          { frequency: "4kHz", gain: 0 },
          { frequency: "8kHz", gain: 0 },
          { frequency: "16kHz", gain: 0 },
        ],
      },
      normalization: true,
      crossfade: 0,
    },
    downloads: {
      quality: "normal",
      useWifiOnly: true,
      autoDownload: {
        enabled: false,
        playlists: [],
      },
    },
    privacy: {
      shareListeningActivity: true,
      privateSession: false,
      showCollections: true,
    },
    accessibility: {
      reduceAnimations: false,
      highContrast: false,
      largeText: false,
      monoAudio: false,
      screenReader: "system",
    },
    notifications: {
      newMusic: true,
      playlistUpdates: true,
      artistUpdates: true,
      promotional: false,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("audio");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const userSettings = await getUserSettings();
        // Deep merge or careful update needed if API returns partial settings
        setSettings((prevSettings) => ({ ...prevSettings, ...userSettings }));
      } catch (error) {
        console.error("Failed to load settings:", error);
        // Handle error appropriately, maybe show a message to the user
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSettingChange = async (category, setting, value) => {
    // Handle nested settings update correctly
    const keys = setting.split(".");
    let updatedSettings = { ...settings };
    let currentLevel = updatedSettings[category];

    for (let i = 0; i < keys.length - 1; i++) {
      currentLevel = currentLevel[keys[i]];
    }
    currentLevel[keys[keys.length - 1]] = value;

    setSettings(updatedSettings);

    try {
      // Send only the changed part to the API
      const updatePayload = { [setting]: value };
      await updateUserSettings(category, updatePayload);
    } catch (error) {
      console.error("Failed to update setting:", error);
      // Revert changes on failure - need original settings state
      // Consider fetching settings again or storing original state before update
    }
  };

  const handleEqualizerBandChange = (index, gain) => {
    const updatedBands = [...settings.audio.equalizer.bands];
    updatedBands[index] = {
      ...updatedBands[index],
      gain: Number(gain),
    };

    const updatedSettings = {
      ...settings,
      audio: {
        ...settings.audio,
        equalizer: {
          ...settings.audio.equalizer,
          bands: updatedBands,
        },
      },
    };

    setSettings(updatedSettings);
    // Debounce the API call to avoid excessive requests
    // Consider using a debounce utility function
    // saveEqualizerSettingsDebounced();
  };

  const saveEqualizerSettings = async () => {
    try {
      await updateUserSettings("audio", {
        equalizer: settings.audio.equalizer,
      });
    } catch (error) {
      console.error("Failed to update equalizer settings:", error);
    }
  };

  // Placeholder render functions for different setting categories
  const renderAudioSettings = () => (
    <div className="settings-section">
      <h2>Audio Settings</h2>
      <div className="setting-item">
        <label htmlFor="audio-quality">Streaming Quality</label>
        <select
          id="audio-quality"
          value={settings.audio.quality}
          onChange={(e) =>
            handleSettingChange("audio", "quality", e.target.value)
          }>
          <option value="auto">Automatic</option>
          <option value="low">Low (96 kbps)</option>
          <option value="normal">Normal (160 kbps)</option>
          <option value="high">High (320 kbps)</option>
        </select>
      </div>
      {/* Add more audio settings here (Normalization, Crossfade, Equalizer toggle) */}
      {/* Equalizer settings would be more complex */}
    </div>
  );

  const renderDownloadSettings = () => (
    <div className="settings-section">
      <h2>Download Settings</h2>
      {/* Add download settings controls */}
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="settings-section">
      <h2>Privacy Settings</h2>
      {/* Add privacy settings controls */}
    </div>
  );

  const renderAccessibilitySettings = () => (
    <div className="settings-section">
      <h2>Accessibility Settings</h2>
      {/* Add accessibility settings controls */}
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <h2>Notification Settings</h2>
      {/* Add notification settings controls */}
    </div>
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <nav className="settings-tabs">
        <button
          onClick={() => setActiveTab("audio")}
          className={activeTab === "audio" ? "active" : ""}>
          Audio
        </button>
        <button
          onClick={() => setActiveTab("downloads")}
          className={activeTab === "downloads" ? "active" : ""}>
          Downloads
        </button>
        <button
          onClick={() => setActiveTab("privacy")}
          className={activeTab === "privacy" ? "active" : ""}>
          Privacy
        </button>
        <button
          onClick={() => setActiveTab("accessibility")}
          className={activeTab === "accessibility" ? "active" : ""}>
          Accessibility
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={activeTab === "notifications" ? "active" : ""}>
          Notifications
        </button>
      </nav>

      <div className="settings-content">
        {activeTab === "audio" && renderAudioSettings()}
        {activeTab === "downloads" && renderDownloadSettings()}
        {activeTab === "privacy" && renderPrivacySettings()}
        {activeTab === "accessibility" && renderAccessibilitySettings()}
        {activeTab === "notifications" && renderNotificationSettings()}
      </div>
    </div>
  );
};

export default SettingsPage;
