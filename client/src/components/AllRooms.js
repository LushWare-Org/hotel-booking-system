import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Button, TextField, CircularProgress, IconButton } from '@mui/material';
import Footer from '../components/Footer';
import { ArrowBack, ArrowForward, Delete } from '@mui/icons-material';

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedRoom, setEditedRoom] = useState({
    name: '',
    description: '',
    maxCount: '',
    rentPerDay: '',
    imageUrls: [''],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageIndices, setImageIndices] = useState({});

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/rooms');
      setRooms(response.data);
      const indices = {};
      response.data.forEach(room => {
        indices[room._id] = 0;
      });
      setImageIndices(indices);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleEdit = (room) => {
    setEditMode(room._id);
    setEditedRoom({
      name: room.name || '',
      description: room.description || '',
      maxCount: room.maxCount || '',
      rentPerDay: room.rentPerDay || '',
      imageUrls: room.imageUrls.length > 0 ? room.imageUrls : [''],
    });
    setImageIndices((prev) => ({
      ...prev,
      [room._id]: 0,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRoom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (roomId, direction) => {
    setImageIndices((prev) => ({
      ...prev,
      [roomId]: direction === 'next'
        ? (prev[roomId] + 1) % editedRoom.imageUrls.length
        : (prev[roomId] - 1 + editedRoom.imageUrls.length) % editedRoom.imageUrls.length,
    }));
  };

  const handleUpdate = async (roomId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/rooms/${roomId}`, editedRoom);
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room._id === roomId ? response.data : room))
      );
      setEditMode(null);
    } catch (error) {
      console.error("Error updating room:", error.response ? error.response.data : error.message);
      setError("Failed to update room");
    }
  };

  const handleDelete = async (roomId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this room?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/rooms/${roomId}`);
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
      alert("Room deleted successfully");
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("Failed to delete room");
    }
  };

  // Function to add a new image input
  const addImageInput = () => {
    setEditedRoom((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ''], 
    }));
  };

  // Function to handle changes to image URLs
  const handleImageUrlChange = (index, value) => {
    const updatedImages = [...editedRoom.imageUrls];
    updatedImages[index] = value; 
    setEditedRoom((prev) => ({ ...prev, imageUrls: updatedImages }));
  };

  // Function to delete a specific image URL
  const deleteImageUrl = (index) => {
    const updatedImages = [...editedRoom.imageUrls];
    updatedImages.splice(index, 1); 
    setEditedRoom((prev) => ({ ...prev, imageUrls: updatedImages }));
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <Grid container spacing={3}>
      {rooms.map((room) => (
        <Grid item xs={12} sm={6} md={4} key={room._id}>
          <Card>
            <CardContent>
              {editMode === room._id ? (
                <>
                  <TextField
                    label="Room Name"
                    name="name"
                    value={editedRoom.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  {editedRoom.imageUrls.map((url, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <TextField
                        label={`Image URL ${index + 1}`}
                        value={url}
                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <IconButton onClick={() => deleteImageUrl(index)} color="error">
                        <Delete />
                      </IconButton>
                    </div>
                  ))}
                  <Button
                    onClick={addImageInput}
                    variant="outlined"
                    style={{ margin: '10px 0' }}
                  >
                    Add Another Image
                  </Button>
                  <TextField
                    label="Description"
                    name="description"
                    value={editedRoom.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                  />
                  <TextField
                    label="Max Count"
                    name="maxCount"
                    type="number"
                    value={editedRoom.maxCount}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Rent Per Day"
                    name="rentPerDay"
                    type="number"
                    value={editedRoom.rentPerDay}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <IconButton onClick={() => handleImageChange(room._id, 'prev')}>
                      <ArrowBack />
                    </IconButton>
                    <Typography variant="body2">Image {imageIndices[room._id] + 1} of {editedRoom.imageUrls.length}</Typography>
                    <IconButton onClick={() => handleImageChange(room._id, 'next')}>
                      <ArrowForward />
                    </IconButton>
                  </div>
                  <Button
                    onClick={() => handleUpdate(room._id)}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditMode(null)}
                    variant="outlined"
                    color="secondary"
                    style={{ marginLeft: '10px' }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6">{room.name}</Typography>
                  <img
                    src={room.imageUrls[imageIndices[room._id]] || 'placeholder_image_url'}
                    alt={room.name}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <IconButton onClick={() => setImageIndices((prev) => ({
                      ...prev,
                      [room._id]: (prev[room._id] - 1 + room.imageUrls.length) % room.imageUrls.length,
                    }))}>
                      <ArrowBack />
                    </IconButton>
                    <Typography variant="body2">Image {imageIndices[room._id] + 1} of {room.imageUrls.length}</Typography>
                    <IconButton onClick={() => setImageIndices((prev) => ({
                      ...prev,
                      [room._id]: (prev[room._id] + 1) % room.imageUrls.length,
                    }))}>
                      <ArrowForward />
                    </IconButton>
                  </div>
                  <Typography variant="body2">{room.description}</Typography>
                  <Typography variant="subtitle1">Max Count: {room.maxCount}</Typography>
                  <Typography variant="subtitle1">Rent Per Day: ${room.rentPerDay}</Typography>
                  <Button
                    onClick={() => handleEdit(room)}
                    variant="contained"
                    color="secondary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(room._id)}
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Grid container direction="column" alignItems="center">
          <Button variant="contained" onClick={fetchRooms}>
            Reload Rooms
          </Button>
          <br /><br /><br />
      <Footer />
      </Grid>
      </Grid>
    </Grid>
  );
};

export default AllRooms;
