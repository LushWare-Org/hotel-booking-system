import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
  Snackbar,
  Alert,
} from '@mui/material';

const AddRoom = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({
    name: '',
    maxCount: '',
    rentPerDay: '',
    imageUrls: [], 
    phoneNumber: '',
    type: '',
    description: '',
    amenities: [],
  });
  const [allAmenities, setAllAmenities] = useState([]); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  // Fetch all available amenities
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/amenities');
        setAllAmenities(response.data);
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };
    fetchAmenities();
  }, []);

  // Fetch room data if editing an existing room
  useEffect(() => {
    const fetchRoom = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
          setRoom(response.data);
        } catch (error) {
          console.error("Error fetching room:", error);
        }
      }
    };
    fetchRoom();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setRoom((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((amenity) => amenity !== value),
      }));
    } else if (name === 'imageUrls') {
      // Process multiple image URLs
      setRoom((prev) => ({
        ...prev,
        imageUrls: value.split(',').map((url) => url.trim()),
      }));
    } else {
      setRoom((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit form for adding or updating a room
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update an existing room
        await axios.put(`http://localhost:5000/api/rooms/${id}`, room);
        setSnackbarMessage('Room updated successfully!');
      } else {
        // Add a new room
        await axios.post('http://localhost:5000/api/rooms', room);
        setSnackbarMessage('Room added successfully!');
      }
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      navigate('/admin');
    } catch (error) {
      console.error("Error processing room:", error.response?.data?.message || error.message);
      setSnackbarMessage(error.response?.data?.message || 'Error processing room');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">{id ? 'Edit Room' : 'Add New Room'}</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Room Name"
                name="name"
                fullWidth
                value={room.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Room Type</InputLabel>
                <Select
                  name="type"
                  value={room.type}
                  onChange={handleChange}
                >
                  <MenuItem value="Deluxe">Deluxe</MenuItem>
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Suite">Suite</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={4}
                value={room.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                fullWidth
                value={room.phoneNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Max Count"
                name="maxCount"
                type="number"
                fullWidth
                value={room.maxCount}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Rent Per Day"
                name="rentPerDay"
                type="number"
                fullWidth
                value={room.rentPerDay}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URLs (comma-separated)"
                name="imageUrls"
                fullWidth
                value={room.imageUrls.join(', ')}
                onChange={handleChange}
                helperText="Separate multiple URLs with commas"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Amenities</Typography>
              {allAmenities.map((amenity) => (
                <FormControlLabel
                  key={amenity}
                  control={
                    <Checkbox
                      checked={room.amenities.includes(amenity)}
                      onChange={handleChange}
                      name="amenities"
                      value={amenity}
                    />
                  }
                  label={amenity}
                />
              ))}
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">{id ? 'Save Changes' : 'Add Room'}</Button>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default AddRoom;
