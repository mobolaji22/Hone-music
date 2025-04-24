import React, { useState, useEffect } from "react";
import { fetchPlaylistDetails, updatePlaylist } from "../api/playlistService";
import { usePlayerContext } from "../contexts/PlayerContext";
import { TrackList } from "../components/TrackList";
import { PlaylistHeader } from "../components/PlaylistHeader";
import { CollaboratorsList } from "../components/CollaboratorsList";

const PlaylistView = ({ playlistId, isOwner }) => {
  const [playlist, setPlaylist] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const { play } = usePlayerContext();

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        // Mock data for now, replace with actual API call
        const data = await fetchPlaylistDetails(playlistId);
        setPlaylist(data);
        setEditedName(data.name);
        setEditedDescription(data.description || "");
      } catch (error) {
        console.error("Failed to load playlist:", error);
        // Set mock data on error for development
        setPlaylist({
          id: playlistId,
          name: "My Awesome Playlist",
          description: "A collection of great songs",
          owner: { name: "User123" },
          collaborative: true,
          collaborators: [
            { id: "c1", name: "Collaborator 1" },
            { id: "c2", name: "Collaborator 2" },
          ],
          tracks: [
            {
              id: "t1",
              title: "Song A",
              artist: "Artist X",
              album: "Album One",
              duration_ms: 180000,
              added_at: "2023-10-26T10:00:00Z",
            },
            {
              id: "t2",
              title: "Song B",
              artist: "Artist Y",
              album: "Album Two",
              duration_ms: 240000,
              added_at: "2023-10-26T10:05:00Z",
            },
          ],
        });
        setEditedName("My Awesome Playlist");
        setEditedDescription("A collection of great songs");
      }
    };

    loadPlaylist();
  }, [playlistId]);

  const handleSaveEdit = async () => {
    try {
      await updatePlaylist(playlistId, {
        name: editedName,
        description: editedDescription,
      });

      setPlaylist({
        ...playlist,
        name: editedName,
        description: editedDescription,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update playlist:", error);
    }
  };

  const handlePlayPlaylist = () => {
    if (playlist && playlist.tracks.length > 0) {
      play(playlist.tracks[0], {
        context: {
          type: "playlist",
          id: playlistId,
          tracks: playlist.tracks,
        },
      });
    }
  };

  if (!playlist) {
    return <div className="loading">Loading playlist...</div>;
  }

  return (
    <div className="playlist-container p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <PlaylistHeader
        playlist={playlist}
        isEditing={isEditing}
        isOwner={isOwner}
        editedName={editedName}
        editedDescription={editedDescription}
        onNameChange={setEditedName}
        onDescriptionChange={setEditedDescription}
        onEdit={() => setIsEditing(true)}
        onSave={handleSaveEdit}
        onCancel={() => setIsEditing(false)}
        onPlay={handlePlayPlaylist}
      />

      {playlist.collaborative && (
        <CollaboratorsList
          collaborators={playlist.collaborators}
          playlistId={playlistId}
          isOwner={isOwner}
        />
      )}

      <TrackList
        tracks={playlist.tracks}
        onTrackPlay={(track, index) => {
          play(track, {
            context: {
              type: "playlist",
              id: playlistId,
              tracks: playlist.tracks,
              index: index,
            },
          });
        }}
        onTrackRemove={
          isOwner
            ? (trackId) => {
                console.log("Remove track:", trackId); // Placeholder for track removal logic
                // Implement actual track removal API call and state update here
              }
            : null
        }
        showAlbum={true}
        showAddedDate={true}
      />
    </div>
  );
};

export default PlaylistView;
