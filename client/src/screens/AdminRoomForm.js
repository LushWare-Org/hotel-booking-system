import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
} from '@mui/material';

const AdminRoomForm = () => {
  const [room, setRoom] = useState({
    name: '',
    size: '',
    occupancy: '',
    amenities: [],
    features: [],
    imageUrls: [],
  });
  const [allAmenities, setAllAmenities] = useState([]);
  const [allFeatures, setAllFeatures] = useState([]);
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      if (roomId) {
        try {
          const response = await axios.get(`http://localhost:5000/rooms/${roomId}`);
          setRoom(response.data.room);
        } catch (error) {
          console.error("Error fetching room:", error);
        }
      }
    };

    const fetchAmenitiesAndFeatures = async () => {
      try {
        const amenitiesResponse = await axios.get('http://localhost:5000/amenities'); 
        const featuresResponse = await axios.get('http://localhost:5000/features'); 
        setAllAmenities(amenitiesResponse.data);
        setAllFeatures(featuresResponse.data);
      } catch (error) {
        console.error("Error fetching amenities or features:", error);
      }
    };

    fetchRoom();
    fetchAmenitiesAndFeatures();
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setRoom((prev) => ({
          ...prev,
          amenities: [...prev.amenities, value],
        }));
      } else {
        setRoom((prev) => ({
          ...prev,
          amenities: prev.amenities.filter((amenity) => amenity !== value),
        }));
      }
    } else {
      setRoom((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (roomId) {
        // Update existing room
        await axios.put(`http://localhost:5000/rooms/${roomId}`, room);
      } else {
        // Create new room
        await axios.post('http://localhost:5000/rooms', room);
      }
      navigate('/admin'); 
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {roomId ? 'Edit Room' : 'Add Room'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Room Name"
                name="name"
                value={room.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Room Size"
                name="size"
                value={room.size}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Occupancy"
                name="occupancy"
                value={room.occupancy}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Amenities</Typography>
              {allAmenities.map((amenity) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={room.amenities.includes(amenity)}
                      onChange={handleChange}
                      name="amenities"
                      value={amenity}
                    />
                  }
                  label={amenity}
                  key={amenity}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {roomId ? 'Update Room' : 'Add Room'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminRoomForm;
