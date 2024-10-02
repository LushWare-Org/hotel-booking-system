import React, { useState, useEffect } from 'react';
import { Typography, Button, Divider, Paper, Card, CardContent, CardMedia } from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import moment from 'moment';
import axios from 'axios';
import ReactDatePicker from 'react-datepicker';  // Import datepicker
import 'react-datepicker/dist/react-datepicker.css';  // Import styles for datepicker
import Swal from 'sweetalert2';
import HotelBookingCalendar from '../components/Calendar';

const useStyles = styled('div')({
  largeImage: {
    height: '300px', // Adjust the height as needed
    objectFit: 'cover',
  },
});

const BookRoom = () => {
  const { id } = useParams();
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);
  const [bookedDates, setBookedDates] = useState([]); // Array for booked dates

  const classes = useStyles;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/rooms/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch room data');
        }

        const data = await response.json();
        setSelectedRoom(data.room);

        // Extract the booked dates and populate the `bookedDates` array
        const bookedDatesArray = [];
        data.room.currentBookings.forEach((booking) => {
          if (booking.status === 'Booked') {
            const start = moment(booking.from_date);
            const end = moment(booking.to_date);
            while (start <= end) {
              bookedDatesArray.push(new Date(start));
              start.add(1, 'days');
            }
          }
        });

        setBookedDates(bookedDatesArray);

        setFromDate(localStorage.getItem('fromDate'));
        setToDate(localStorage.getItem('toDate'));
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const differenceInDays = moment.duration(moment(toDate).diff(moment(fromDate))).asDays() + 1;
    setDays(differenceInDays);
    setTotal(differenceInDays * selectedRoom.rentPerDay);
  }, [fromDate, toDate, selectedRoom.rentPerDay]);

  const handleDateRangeChange = (dates) => {
    setFromDate(dates[0]);
    setToDate(dates[1]);
    const diffInDays = moment.duration(moment(dates[1], 'YYYY-MM-DD').diff(moment(dates[0], 'YYYY-MM-DD'))).asDays() + 1;
    setDays(diffInDays);
    setTotal(diffInDays * selectedRoom.rentPerDay);
  };

  const handleBookNow = async () => {
    const bookingBody = {
      room: selectedRoom.name,
      room_id: selectedRoom._id,
      user_id: JSON.parse(localStorage.getItem('currentUser'))._id,
      from_date: moment(fromDate).format('YYYY-MM-DD'),
      to_date: moment(toDate).format('YYYY-MM-DD'),
      total_days: days,
      total_amount: total,
    };

    try {
      const response = await axios.post('http://localhost:5000/book/', bookingBody);
      Swal.fire('Congrats', 'Your booking is successful.', 'success').then(result => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Error booking room:', error.message);
    }
  };

  // Function to disable booked dates and style them in red
  const isDateBooked = (date) => {
    return bookedDates.some(
      (bookedDate) => moment(bookedDate).isSame(moment(date), 'day')
    );
  };

  // Function to set className for booked dates (for red styling)
  const dayClassName = (date) => {
    return isDateBooked(date) ? 'booked-date' : '';
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
      <Card>
        <CardMedia
          component="img"
          alt={selectedRoom.name}
          className={classes.largeImage}
          height="auto"
          image={selectedRoom?.imageUrls?.length ? selectedRoom.imageUrls[0] : 'default-image-url'}
        />
        <CardContent>
          <Typography variant="h4">{selectedRoom.name}</Typography>
          <Typography variant="subtitle1">Type: {selectedRoom.type}</Typography>
          <Typography variant="subtitle1">Rent per Day: ${selectedRoom.rentPerDay}</Typography>
          <Typography>{selectedRoom.description}</Typography>
          <Divider style={{ margin: '16px 0' }} />
          
          {/* Availability Calendar */}
          <Typography variant="h6">Select Date Range:</Typography>
          <ReactDatePicker
            selected={fromDate}
            onChange={handleDateRangeChange}
            startDate={fromDate}
            endDate={toDate}
            selectsRange
            inline
            excludeDates={bookedDates}  // Disable booked dates
            dayClassName={dayClassName} // Style booked dates
          />
          
          <Typography variant="h6">Days: {days ? days : 0}</Typography>
          <Typography variant="h6">Total: ${total ? total : 0}</Typography>
          <Button variant="contained" color="primary" onClick={handleBookNow} style={{ marginTop: '16px' }}>
            Pay Now
          </Button>

          <Divider style={{ margin: '16px 0' }} />

          {/* Calendar for Current Bookings */}
          <Typography variant="h6">Current Bookings:</Typography>
          <ReactDatePicker
            inline
            highlightDates={bookedDates} // Highlight booked dates in red
            dayClassName={dayClassName} // Style booked dates
            readOnly // Make the calendar read-only
          />
        </CardContent>
      </Card>

      <HotelBookingCalendar/>

    </Paper>
  );
};

export default BookRoom;
