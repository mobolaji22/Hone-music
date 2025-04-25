import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";

export const PlaylistHeader = ({
  playlist,
  isEditing,
  isOwner,
  editedName,
  editedDescription,
  onNameChange,
  onDescriptionChange,
  onEdit,
  onSave,
  onCancel,
  onPlay,
}) => {
  return (
    <div className="playlist-header flex flex-col md:flex-row items-center md:items-end gap-4 mb-6">
      {/* Placeholder for playlist image */}
      <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-700 rounded flex-shrink-0 flex items-center justify-center">
        <Icon name="music" className="w-16 h-16 text-gray-500" />
      </div>
      <div className="flex-grow text-center md:text-left">
        <p className="text-xs font-semibold uppercase text-gray-400 mb-1">
          Playlist
        </p>
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => onNameChange(e.target.value)}
            className="text-4xl md:text-6xl font-bold bg-transparent border-b-2 border-gray-500 focus:border-green-500 outline-none mb-2 w-full text-white"
            placeholder="Playlist Name"
          />
        ) : (
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-2 truncate"
            onClick={isOwner ? onEdit : null}
            style={{ cursor: isOwner ? "pointer" : "default" }}>
            {playlist.name}
          </h1>
        )}
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="text-sm text-gray-300 bg-transparent border border-gray-600 rounded p-2 focus:border-green-500 outline-none w-full h-20 resize-none"
            placeholder="Add an optional description"
          />
        ) : (
          <p
            className="text-sm text-gray-300 mb-3"
            onClick={isOwner ? onEdit : null}
            style={{ cursor: isOwner ? "pointer" : "default" }}>
            {playlist.description ||
              (isOwner ? "Click to add description" : "")}
          </p>
        )}
        <div className="flex items-center text-sm text-gray-400 gap-1 justify-center md:justify-start">
          {/* Placeholder for owner info */}
          <span>{playlist.owner?.name || "Unknown Owner"}</span>
          {/* Placeholder for track count/duration */}
          {playlist.tracks && <span>• {playlist.tracks.length} songs</span>}
        </div>
        {isEditing && isOwner && (
          <div className="mt-4 flex gap-2 justify-center md:justify-start">
            <button
              onClick={onSave}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        )}
      </div>
      {!isEditing && (
        <button
          onClick={onPlay}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 absolute bottom-4 right-4 md:static md:self-end">
          <Icon name="play" className="w-6 h-6 fill-current" />
        </button>
      )}
    </div>
  );
};

PlaylistHeader.propTypes = {
  playlist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    owner: PropTypes.shape({ name: PropTypes.string }),
    tracks: PropTypes.array,
    // Add other relevant playlist properties
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  editedName: PropTypes.string.isRequired,
  editedDescription: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
};
