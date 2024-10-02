import React, { useState } from 'react';
import { Grid, TextField, Button, IconButton, List, ListItem, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axios from 'axios';

const SearchBar = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomList, setRoomList] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/rooms/search', {
        checkInDate,
        checkOutDate,
        rooms,
        adults,
        children,
      });
      console.log(response);
      // Assuming response contains room list in `data` property
      setRoomList(response.data);
    } catch (error) {
      console.error('Error fetching room data:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} alignItems="center" style={{ backgroundImage: 'url(/background.jpg)', padding: '20px', borderRadius: '10px' }}>
        <Grid item xs={12} sm={3}>
          <DatePicker
            label="Check-in date"
            value={checkInDate}
            onChange={(newValue) => setCheckInDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} InputProps={{
                endAdornment: (
                  <IconButton>
                    <CalendarTodayIcon />
                  </IconButton>
                )
              }} fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <DatePicker
            label="Check-out date"
            value={checkOutDate}
            onChange={(newValue) => setCheckOutDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} InputProps={{
                endAdornment: (
                  <IconButton>
                    <CalendarTodayIcon />
                  </IconButton>
                )
              }} fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <TextField
            label="Rooms"
            type="number"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <TextField
            label="Adults"
            type="number"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <TextField
            label="Children"
            type="number"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
            Search
          </Button>
        </Grid>

        {/* Display Room List */}
        <Grid item xs={12}>
          <Typography variant="h6" style={{ marginTop: '20px' }}>Available Rooms</Typography>
          <List>
            {roomList.length > 0 ? (
              roomList.map((room, index) => (
                <ListItem key={index}>
                  <Typography>{room.name} - {room.price} per night</Typography>
                </ListItem>
              ))
            ) : (
              <Typography>No rooms found.</Typography>
            )}
          </List>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default SearchBar;
