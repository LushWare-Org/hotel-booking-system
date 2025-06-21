import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Paper,
  TextField,
  Divider,
  Grid,
  Box,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const PremiumPaymentGateway = () => {
  const { id } = useParams();
  const [selectedRoom, setSelectedRoom] = useState({});
  const [fromDate, setFromDate] = useState(localStorage.getItem('fromDate') || null);
  const [toDate, setToDate] = useState(localStorage.getItem('toDate') || null);
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/rooms/${id}`);
        setSelectedRoom(response.data);
        const diffInDays = moment.duration(moment(toDate).diff(moment(fromDate))).asDays() + 1;
        setDays(diffInDays);
        setTotal(diffInDays * response.data.rentPerDay);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();
  }, [id, fromDate, toDate]);

  const handlePayment = async () => {
    const paymentDetails = {
      room: selectedRoom.name,
      room_id: selectedRoom._id,
      user_id: JSON.parse(localStorage.getItem('currentUser')).id,
      from_date: moment(fromDate).format('YYYY-MM-DD'),
      to_date: moment(toDate).format('YYYY-MM-DD'),
      total_days: days,
      total_amount: total,
    };

    try {
      console.log(paymentDetails);

      const response = await axios.post('http://localhost:8000/api/book/', paymentDetails);
      Swal.fire('Payment Successful', 'Thank you for your payment!', 'success').then(() => {
        navigate('/');
        window.location.reload();
      });
    } catch (error) {
      Swal.fire('Payment Failed', 'There was an error processing your payment.', 'error');
      console.error('Payment error:', error);
    }
  };

  if (!selectedRoom.name) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #001970 100%)',
          color: 'white',
          textAlign: 'center',
          py: { xs: 6, sm: 8, md: 12 },
          px: { xs: 2, sm: 4 },
          minHeight: { xs: '50vh', sm: '40vh', md: '60vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 1,
          },
          '& > *': {
            position: 'relative',
            zIndex: 2,
          }
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 'bold',
            mb: { xs: 2, md: 4 },
            fontSize: { 
              xs: '2rem', 
              sm: '2.5rem', 
              md: '3.5rem', 
              lg: '4rem' 
            },
            textShadow: '2px 2px 5px rgba(0,0,0,0.6)',
            lineHeight: 1.3,
          }}
        >
          Welcome to Payment Gateway
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 300,
            opacity: 0.9,
            fontSize: { 
              xs: '1rem', 
              sm: '1.2rem', 
              md: '1.6rem',
              lg: '1.8rem'
            },
            maxWidth: '90%',
            lineHeight: 1.5,
          }}
        >
          Secure & Fast Hotel Booking Payment
        </Typography>
        
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            right: '8%',
            width: { xs: '60px', sm: '80px', md: '100px' },
            height: { xs: '60px', sm: '80px', md: '100px' },
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            display: { xs: 'none', sm: 'block' },
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '25%',
            left: '12%',
            width: { xs: '40px', sm: '50px', md: '70px' },
            height: { xs: '40px', sm: '50px', md: '70px' },
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            display: { xs: 'none', sm: 'block' },
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '5%',
            width: { xs: '25px', sm: '30px', md: '40px' },
            height: { xs: '25px', sm: '30px', md: '40px' },
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            display: { xs: 'none', md: 'block' },
            animation: 'float 10s ease-in-out infinite',
          }}
        />
      </Box>

      <Box sx={{ py: { xs: 3, sm: 4, md: 2 } }} />

      <Paper
        elevation={3}
        style={{
          maxWidth: '600px',
          margin: 'auto',
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
        sx={{
          width: { xs: '90vw', sm: '80vw', md: '70vw', lg: '50vw' },
          maxWidth: { xs: '95vw', sm: '90vw', md: '700px' },
          mx: 'auto',
          my: { xs: 2, sm: 3 },
        }}
      >
        <Box
          style={{
            backgroundImage: `url(${selectedRoom?.imageUrls?.[0] || 'default-image-url'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '200px',
          }}
          sx={{
            height: { xs: '150px', sm: '180px', md: '200px' },
            mb: { xs: 1, sm: 2 },
          }}
        ></Box>
        <div 
          style={{ padding: '16px 20px 24px' }}
          className="payment-content"
        >
          <Typography
            variant="h4"
            style={{
              fontFamily: 'Playfair Display, serif',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#333',
            }}
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
              mb: 2,
            }}
          >
            Secure Payment Gateway
          </Typography>
          <Divider sx={{ my: 2, borderColor: '#e0e0e0' }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography 
                variant="subtitle1" 
                style={{ fontWeight: '600', color: '#555' }}
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                Room Name:
              </Typography>
              <Typography 
                variant="body1"
                sx={{
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  color: '#666',
                  mb: { xs: 1.5, sm: 2 },
                }}
              >
                {selectedRoom.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography 
                variant="subtitle1" 
                style={{ fontWeight: '600', color: '#555' }}
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                Total Amount:
              </Typography>
              <Typography 
                variant="body1"
                sx={{
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  color: '#666',
                  mb: { xs: 1.5, sm: 2 },
                }}
              >
                ${total}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography 
                variant="subtitle1" 
                style={{ fontWeight: '600', color: '#555' }}
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                Check-in:
              </Typography>
              <Typography 
                variant="body1"
                sx={{
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  color: '#666',
                  mb: { xs: 1.5, sm: 2 },
                }}
              >
                {moment(fromDate).format('YYYY-MM-DD')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography 
                variant="subtitle1" 
                style={{ fontWeight: '600', color: '#555' }}
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                Check-out:
              </Typography>
              <Typography 
                variant="body1"
                sx={{
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  color: '#666',
                  mb: { xs: 1.5, sm: 2 },
                }}
              >
                {moment(toDate).format('YYYY-MM-DD')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2, borderColor: '#e0e0e0' }} />
            </Grid>
          </Grid>
          <Typography
            variant="h6"
            style={{ fontFamily: 'Roboto, sans-serif', color: '#333' }}
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              mb: 2,
            }}
          >
            Enter Payment Details:
          </Typography>
          <TextField
            fullWidth
            label="Card Number"
            variant="outlined"
            style={{ marginBottom: '12px', backgroundColor: '#fff', borderRadius: '8px' }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': { borderColor: '#ccc' },
                '&:hover fieldset': { borderColor: '#888' },
              },
              '& .MuiInputBase-input': {
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                py: { xs: 1.5, sm: 2 },
              },
              '& .MuiInputLabel-root': {
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
              },
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expiry Date (MM/YY)"
                variant="outlined"
                style={{ marginBottom: '12px', backgroundColor: '#fff', borderRadius: '8px' }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': { borderColor: '#ccc' },
                    '&:hover fieldset': { borderColor: '#888' },
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                    py: { xs: 1.5, sm: 2 },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CVV"
                variant="outlined"
                style={{ marginBottom: '12px', backgroundColor: '#fff', borderRadius: '8px' }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': { borderColor: '#ccc' },
                    '&:hover fieldset': { borderColor: '#888' },
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                    py: { xs: 1.5, sm: 2 },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: '#4CAF50',
              color: '#fff',
              fontWeight: '600',
              borderRadius: '8px',
              boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.1)',
            }}
            sx={{
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              mt: 2,
            }}
            onClick={handlePayment}
          >
            Pay Now
          </Button>
        </div>
      </Paper>

      {/* Gap between payment box and footer */}
      <Box sx={{ py: { xs: 4, sm: 5, md: 3 } }} />

      <Footer />

      {/* Add custom CSS for additional mobile responsiveness */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        .payment-content {
          padding: 16px 20px 24px !important;
        }
        
        @media (max-width: 600px) {
          .payment-content {
            padding: 12px 16px 20px !important;
          }
        }
        
        @media (max-width: 400px) {
          .payment-content {
            padding: 10px 12px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PremiumPaymentGateway;