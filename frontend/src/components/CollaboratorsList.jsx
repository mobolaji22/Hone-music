import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon"; // Assuming an Icon component exists

export const CollaboratorsList = ({ collaborators, playlistId, isOwner }) => {
  if (!collaborators || collaborators.length === 0) {
    return null; // Don't render if no collaborators
  }

  return (
    <div className="collaborators-list my-4 p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-white">Collaborators</h3>
      <ul className="space-y-2">
        {collaborators.map((collab) => (
          <li
            key={collab.id}
            className="flex items-center justify-between text-sm text-gray-300">
            <div className="flex items-center gap-2">
              {/* Placeholder for collaborator avatar */}
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <Icon name="user" className="w-4 h-4 text-gray-400" />
              </div>
              <span>{collab.name}</span>
            </div>
            {isOwner && (
              <button
                onClick={() =>
                  console.log(
                    "Remove collaborator:",
                    collab.id,
                    "from playlist:",
                    playlistId
                  )
                } // Placeholder
                className="text-gray-400 hover:text-red-500"
                title="Remove collaborator">
                <Icon name="x" className="w-4 h-4" />
              </button>
            )}
          </li>
        ))}
      </ul>
      {isOwner && (
        <button
          onClick={() =>
            console.log("Add collaborator to playlist:", playlistId)
          } // Placeholder
          className="mt-3 text-sm text-green-400 hover:text-green-300 flex items-center gap-1">
          <Icon name="plus-circle" className="w-4 h-4" />
          Add Collaborator
        </button>
      )}
    </div>
  );
};

CollaboratorsList.propTypes = {
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      // Add other relevant collaborator properties
    })
  ).isRequired,
  playlistId: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
};
