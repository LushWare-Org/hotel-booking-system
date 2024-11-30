import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RoomDetails = () => {
  const { id } = useParams(); // Get the room ID from the URL
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/rooms/${id}`); 
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room details:', error);
        setLoading(false);  
      }
    };
    fetchRoomDetails();
  }, [id]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="room-details">
    <h1>{room.name}</h1>
    <img src={room.imageUrls} alt={room.name} />
    <p>{room.description}</p>
    <p>Max Count: {room.maxCount}</p>
    <p>Rent Per Day: ${room.rentPerDay}</p>
    <p>Phone Number: {room.phoneNumber}</p>
  
</div>
  );
};

export default RoomDetails;
