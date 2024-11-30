import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import {styled} from '@mui/system';
import Swal from 'sweetalert2';
import AdminPanel from './AdminPanel';
import Footer from '../components/Footer';

const useStyles = styled('div')({
  card: {
    minWidth: 275,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  content: {
    textAlign: 'left',
  },
  cancelBtn: {
    marginTop: 10,
  },
});

const Account = () => {

  const classes = useStyles;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const id = currentUser._id;
    const admin = currentUser.isAdmin;
    const [myBookings, setMyBookings] = useState([]);

    useEffect(()=>{

      const fetchData = async() => {
        try{
          const response = await fetch(`http://localhost:5000/book/${id}`);
          console.log(response);
          if (!response.ok) {
            throw new Error('Failed to fetch room data');
          }
          const data = await response.json();
          console.log(data);
          setMyBookings(data);
        }
        catch (error) {
          console.error('Error fetching room:', error);
        }
      };
      fetchData();
    }, [id])

    const handleCancelBooking = (bookingId) => {
      // Assuming you have a function to handle the cancel booking API call
      // You can use libraries like Axios or fetch for the API call
      fetch(`http://localhost:5000/book/cancel/${bookingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add any additional parameters or data needed for the cancel API call
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Booking canceled.');
          // You may want to update the UI or state after successful cancellation
          Swal.fire('Congrats', 'Your booking has been cancelled.','success').then(result=>{
            window.location.reload();
          })
        })
        .catch((error) => {
          console.error('Error canceling booking:', error);
          Swal.fire('Oops', 'Something went wrong.', 'error');
        });
    };

  return (
    <div>
        <h5 style={{textAlign: "center"}}>{currentUser.name}</h5>
        <p style={{textAlign: "center"}}>{currentUser.email}</p>
        <div>
          <Grid container spacing={2}>
            {myBookings.length > 0 && myBookings.map((booking) => (
              <Grid item xs={4} key={booking.transaction_id}>
                <Card className={classes.card}>
                  <CardContent className={classes.content}>
                    <Typography variant="h6">Booking Details</Typography>
                    <Typography>Date Range: {booking.from_date} to {booking.to_date}</Typography>
                    <Typography>Room: {booking.room}</Typography>
                    <Typography>Status: {booking.status}</Typography>
                    <Typography>Total Amount: ${booking.total_amount}</Typography>
                    {/* Add more details if needed */}
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.cancelBtn}
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel Booking
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Footer/>
          {admin && (
            <div>
              <AdminPanel />
            </div>
            
          )}
        </div>
    </div>
    
  )
}

export default Account;