// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const RoomDashboard = () => {
//     const { id } = useParams(); // Extract the room ID from the URL
//     const [room, setRoom] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Fetch room data from the backend API
//         fetch(`http://localhost:5000/rooms/${id}`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch room data');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setRoom(data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 setError(err.message);
//                 setLoading(false);
//             });
//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             <h1>{room.name}</h1>
//             <img src={room.imageUrls} alt={room.name} />
//             <p>Type: {room.type}</p>
//             <p>Max Guests: {room.maxCount}</p>
//             <p>Phone Number: {room.phoneNumber}</p>
//             <p>Rent Per Day: ${room.rentPerDay}</p>
//             <p>{room.description}</p>

//             {/* Add booking functionality and calendar here */}
//             <button>Book Now</button>
//         </div>
//     );
// };

// export default RoomDashboard;
