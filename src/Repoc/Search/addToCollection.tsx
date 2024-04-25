// import React, { useState, useEffect } from 'react';
// import { getCollectionsForUser } from './client';

// const AddToPlaylistModal = ({ userId:any, showModal, onClose }) => {
//   const [collections, setCollections] = useState([]);
//   const [selectedCollection, setSelectedCollection] = useState([]);

//   useEffect(() => {
//     // Fetch playlists from the server
//     const collections = getCollectionsForUser(userId);
//     setCollections(collections);
//   }, []);


//   const handleColListChange = (collectionId) => {
//     // Toggle playlist selection
//     setSelectedCollection((prevSelected) =>
//       prevSelected.includes(playlistId)
//         ? prevSelected.filter((id) => id !== playlistId)
//         : [...prevSelected, playlistId]
//     );
//   };

//   const handleAddToPlaylist = () => {
//     // Logic to add item to selected playlists
//     // This is a placeholder for actual functionality
//     console.log("Adding to playlists:", selectedPlaylists);
//     onClose(); // Close modal
//   };

//   return (
//     <div className={`modal ${showModal ? 'show' : ''}`}>
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>&times;</span>
//         <h2>Add to Playlist</h2>
//         <ul>
//           {playlists.map((playlist) => (
//             <li key={playlist.id}>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={selectedPlaylists.includes(playlist.id)}
//                   onChange={() => handlePlaylistChange(playlist.id)}
//                 />
//                 {playlist.name}
//               </label>
//             </li>
//           ))}
//         </ul>
//         <button onClick={handleAddToPlaylist}>Add to Playlist</button>
//       </div>
//     </div>
//   );
// };

// export default AddToPlaylistModal;
export {};
