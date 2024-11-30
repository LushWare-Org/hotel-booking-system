import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import DateRange from '../components/DateRange';
import Footer from '../components/Footer';
import ClickablePicture from './ClickablePicture';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import WifiIcon from '@mui/icons-material/Wifi';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'; // Import arrow icons
import RoomSearch from './RoomSearch';

// Mapping facility names to icons
const facilityIcons = {
  "Free Wi-Fi": <WifiIcon />,
  "Minibar": <FreeBreakfastIcon />,
  "Shower WC": <BathtubIcon />,
  "Bathrobe": <LocalLaundryServiceIcon />,
  "In-room Digital Safe": <SafetyCheckIcon />,
  "Iron and Iron Board": <LocalLaundryServiceIcon />,
};

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDateRangeChange = (dates) => {
    setFromDate(dates[0]);
    setToDate(dates[1]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms', {
          params: {
            fromDate,
            toDate,
          },
        });
        setRooms(response.data);
        setFilteredRooms(response.data); // Initially, all rooms are shown
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchData();
  }, [fromDate, toDate]); // Run on date changes

  return (
    <div>
      <br />
      <h1 style={{ textAlign: "center", fontFamily: 'Dancing Script' }}>Book Now</h1>
      <br />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <DateRange onDateChange={handleDateRangeChange} />
      </div>
      <br />

      <div style={{ padding: '0 10%', marginTop: '1%' }}>
        <RoomSearch setFilteredRooms={setFilteredRooms} rooms={rooms} />
        <Grid container spacing={3}>
          {Array.isArray(filteredRooms) && filteredRooms.map((room) => (
            <Grid item key={room._id} xs={12} sm={6} md={4}>
              <ClickablePicture
                imageUrl={room.imageUrls[0]}
                title={room.name}
                sentence1={`Type: ${room.type}\n${room.description}`} 
                onClick={() => handleRoomClick(room)}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          style: { minHeight: '500px' },
        }}
      >
        {selectedRoom && (
          <>
            <Carousel
              showThumbs={false}
              infiniteLoop
              useKeyboardArrows
              autoPlay
              renderArrowPrev={(onClickHandler, hasPrev) =>
                hasPrev && (
                  <div onClick={onClickHandler} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 10 }}>
                    <KeyboardArrowLeft style={{ fontSize: '40px', color: '#fff' }} />
                  </div>
                )
              }
              renderArrowNext={(onClickHandler, hasNext) =>
                hasNext && (
                  <div onClick={onClickHandler} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 10 }}>
                    <KeyboardArrowRight style={{ fontSize: '40px', color: '#fff' }} />
                  </div>
                )
              }
            >
              {selectedRoom.imageUrls.map((url, index) => (
                <div key={index}>
                  <img src={url} alt={`${selectedRoom.name} - Image ${index + 1}`} style={{ width: '100%', height: '450px' }} />
                </div>
              ))}
            </Carousel>
            <DialogTitle>{selectedRoom.name}</DialogTitle>
            <DialogContent>
              <Typography variant="body1">Type: {selectedRoom.type}</Typography>
              <Typography variant="body1">Description: {selectedRoom.description}</Typography>

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography variant="body1">Max Count: {selectedRoom.maxCount}</Typography>
                <Typography variant="body1">Phone Number: {selectedRoom.phoneNumber}</Typography>
                <Typography variant="body1">Rent Per Day: {selectedRoom.rentPerDay}</Typography>
              </Box>

              <Typography variant="h6" style={{ marginTop: '10px' }}>Facilities:</Typography>
              <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
                {Array.isArray(selectedRoom.facilities) && selectedRoom.facilities.map((facility, index) => (
                  <Box key={index} display="flex" alignItems="center">
                    {facilityIcons[facility] || null} {/* Render the corresponding icon */}
                    <Typography variant="body2" style={{ marginLeft: '8px' }}>{facility}</Typography>
                  </Box>
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">Close</Button>
              <Button
                color="primary"
                onClick={() => window.location.href = `/rooms/${selectedRoom._id}`}
              >
                Book Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <br /><br />

      <Footer />
    </div>
  );
};

export default Rooms;
