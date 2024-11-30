import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookRoom.css';
import { Typography, Button, Grid } from '@mui/material';
import { Wifi, Shower, Bathtub, Iron, SafetyDivider, HelpOutline } from '@mui/icons-material';
import Footer from './Footer';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel'; 
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'; 

const BookRoom = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [bookingDates, setBookingDates] = useState({ start: '', end: '' });

  // Icons mapping for facilities
  const facilityIcons = {
    "Free Wi-Fi": <Wifi />,
    "Shower": <Shower />,
    "Bathtub": <Bathtub />,
    "Iron and Iron Board": <Iron />,
    "In-room Safe": <SafetyDivider />,
    // Add more mappings as needed
  };

  const getNormalizedFacility = (facility) => {
    const normalizedFacilityNames = {
      "WiFi": "Free Wi-Fi",
      "Iron": "Iron and Iron Board",
      "Safe": "In-room Safe",
      // Normalize other facility names if needed
    };
    return normalizedFacilityNames[facility] || facility;
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`/api/rooms/${id}`);
        setRoom(response.data);
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };
    fetchRoom();
  }, [id]);

  const handleBooking = async () => {
    console.log('Booking dates:', bookingDates);
    try {
      await axios.post(`/api/bookings`, {
        roomId: id,
        ...bookingDates, 
      });
      alert('Booking successful!');
    } catch (error) {
      console.error('Error booking room:', error);
      alert('Failed to book the room.');
    }
  };

  if (!room) return <div>Loading...</div>;

  return (
    <div className="book-room" style={{ overflowX: 'hidden' }}>
      <Typography variant="h4" align="center">{room.name}</Typography><br />

      {/* Carousel for room images */}
      {room.imageUrls && (
        <Carousel
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          showStatus={false} 
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <div className="arrow-button arrow-prev" onClick={onClickHandler}>
                <KeyboardArrowLeft style={{ fontSize: '40px', color: '#fff' }} />
              </div>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <div className="arrow-button arrow-next" onClick={onClickHandler}>
                <KeyboardArrowRight style={{ fontSize: '40px', color: '#fff' }} />
              </div>
            )
          }
        >
          {room.imageUrls.map((url, index) => (
            <div key={index} className="carousel-image-container">
              <img src={url} alt={`${room.name} - Image ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      )}
      <br />

      <div className="booking-section" style={{ marginTop: '20px' }}>
        <Typography variant="h5">Book This Room</Typography><br />

        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <label>
              Start Date:
              <input
                type="date"
                value={bookingDates.start}
                onChange={(e) => setBookingDates({ ...bookingDates, start: e.target.value })}
                required
              />
            </label>
          </Grid>
          <Grid item>
            <label>
              End Date:
              <input
                type="date"
                value={bookingDates.end}
                onChange={(e) => setBookingDates({ ...bookingDates, end: e.target.value })}
                required
              />
            </label>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleBooking}
            style={{ marginTop: '15px' }}
          >
            Book Now
          </Button>
        </Grid><br />

        <div className="details-section" style={{ marginTop: '20px', marginLeft: '450px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="body1" paragraph>Room Details: {room.description}</Typography>
          <Typography variant="body1">Room Type: {room.type}</Typography><br />
          <Typography variant="body1">Max Count: {room.maxCount}</Typography><br />
          <Typography variant="body1">Rent Per Day: ${room.rentPerDay}</Typography><br />
          <Typography variant="body1">Phone Number: {room.phoneNumber}</Typography><br />

          <Typography variant="body1" style={{ marginTop: '10px' }}>Facilities:</Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
            {Array.isArray(room.facilities) && room.facilities.map((facility, index) => {
              const normalizedFacility = getNormalizedFacility(facility);
              const icon = facilityIcons[normalizedFacility] || <HelpOutline />;
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '20px',
                  }}
                >
                  {icon}
                  <Typography variant="body2" style={{ marginLeft: '5px' }}>
                    {facility}
                  </Typography>
                </div>
              );
            })}
          </div>
          <br />
        </div>

        <br />
        <Footer />
      </div>
    </div>
  );
};

export default BookRoom;
