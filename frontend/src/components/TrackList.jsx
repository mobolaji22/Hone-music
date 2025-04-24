import React from "react";
import PropTypes from "prop-types";
import { formatTime } from "../utils/formatters"; // Assuming formatTime is in utils
import Icon from "./Icon"; // Assuming an Icon component exists

export const TrackList = ({
  tracks,
  onTrackPlay,
  onTrackRemove,
  showAlbum,
  showAddedDate,
}) => {
  if (!tracks || tracks.length === 0) {
    return <p className="text-gray-400">No tracks in this playlist.</p>;
  }

  return (
    <div className="track-list mt-4">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="text-xs text-gray-400 uppercase border-b border-gray-700">
          <tr>
            <th scope="col" className="px-4 py-3 w-10">
              #
            </th>
            <th scope="col" className="px-4 py-3">
              Title
            </th>
            {showAlbum && (
              <th scope="col" className="px-4 py-3 hidden md:table-cell">
                Album
              </th>
            )}
            {showAddedDate && (
              <th scope="col" className="px-4 py-3 hidden lg:table-cell">
                Date Added
              </th>
            )}
            <th scope="col" className="px-4 py-3">
              <Icon name="clock" className="w-4 h-4 inline-block" />
            </th>
            {onTrackRemove && (
              <th scope="col" className="px-4 py-3 w-10">
                <span className="sr-only">Remove</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr key={track.id} className="hover:bg-gray-800 group">
              <td className="px-4 py-2 text-gray-400 group-hover:text-white">
                <span className="group-hover:hidden">{index + 1}</span>
                <button
                  onClick={() => onTrackPlay(track, index)}
                  className="hidden group-hover:block text-white">
                  <Icon name="play" className="w-4 h-4" />
                </button>
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  {/* Add track image if available */}
                  {/* <img src={track.album?.images?.[0]?.url || 'default-album-art.png'} alt={track.name} className="w-10 h-10 mr-3 rounded" /> */}
                  <div>
                    <div className="font-medium text-white truncate">
                      {track.title}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {track.artist}
                    </div>
                  </div>
                </div>
              </td>
              {showAlbum && (
                <td className="px-4 py-2 hidden md:table-cell truncate">
                  {track.album}
                </td>
              )}
              {showAddedDate && (
                <td className="px-4 py-2 hidden lg:table-cell">
                  {new Date(track.added_at).toLocaleDateString()}
                </td>
              )}
              <td className="px-4 py-2 text-gray-400">
                {formatTime(track.duration_ms / 1000)}
              </td>
              {onTrackRemove && (
                <td className="px-4 py-2">
                  <button
                    onClick={() => onTrackRemove(track.id)}
                    className="text-gray-400 hover:text-white">
                    <Icon name="trash" className="w-4 h-4" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string,
      duration_ms: PropTypes.number.isRequired,
      added_at: PropTypes.string, // Assuming ISO string format
      // Add other relevant track properties here
    })
  ).isRequired,
  onTrackPlay: PropTypes.func.isRequired,
  onTrackRemove: PropTypes.func, // Optional remove function
  showAlbum: PropTypes.bool,
  showAddedDate: PropTypes.bool,
};

TrackList.defaultProps = {
  showAlbum: false,
  showAddedDate: false,
  onTrackRemove: null,
};
