import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Button, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

// Coordinates for your hotel's location
const center = {
  lat: 6.9271,  // Latitude of your hotel
  lng: 79.8612, // Longitude of your hotel
};

const Footer = () => {

  const handleNavigation = (destination) => {
    console.log(`Navigating to ${destination}`);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#111', height: '85vh' }}>
      <Container>
        <Toolbar>
          <Grid container spacing={6} alignItems="center" marginTop="20px">
            <Grid item>
              <div>
                <Typography variant="h3" gutterBottom style={{ color: '#fff' }}>
                  The LUXURY Hotel
                </Typography>
                <Typography variant="h6" gutterBottom style={{ color: '#fff' }}>
                  123 Main Street, Colombo, Sri Lanka
                </Typography>
                <Typography variant="h6" gutterBottom style={{ color: '#fff' }}>
                  Phone: +94 91 565 8956
                </Typography>
                <Typography variant="h6" gutterBottom style={{ color: '#fff' }}>
                  Email: example@example.com
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={3} style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid container direction="column" alignItems="center">
                <Button variant="text" component={Link} to="/" style={{ color: '#fff', marginTop: '0px' }} onClick={() => handleNavigation('Home')}>
                  Home
                </Button><br></br>
                <Button variant="text" component={Link} to="/rooms" style={{ color: '#fff', marginTop: '10px' }} onClick={() => handleNavigation('Rooms')}>
                  Rooms
                </Button><br></br>
                <Button variant="text" component={Link} to="/facilities" style={{ color: '#fff', marginTop: '10px' }} onClick={() => handleNavigation('Services')}>
                  Services
                </Button><br></br>
                <Button variant="text" component={Link} to="/contact" style={{ color: '#fff', marginTop: '10px' }} onClick={() => handleNavigation('Contact Us')}>
                  Contact Us
                </Button><br></br>
                <Button variant="text" component={Link} to="/login" style={{ color: '#fff', marginTop: '10px' }} onClick={() => handleNavigation('Contact Us')}>
                  Login
                </Button><br></br>
                <Button variant="text" component={Link} to="/register" style={{ color: '#fff', marginTop: '10px' }} onClick={() => handleNavigation('Contact Us')}>
                  Register
                </Button><br></br><br></br>
              </Grid>
            </Grid>

            <Grid item xs={15} sm={6} md={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h5" gutterBottom style={{ color: '#fff', textAlign: 'center' }}>
                Find Us Here
              </Typography>

              <LoadScript googleMapsApiKey="AIzaSyBhJYhA-bRJgkniJETT1BY6I1C4fEexfdc">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={14}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript><br></br>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom style={{ color: '#fff' }}>
                  Connect With Us
                </Typography>
                <div>
                  <IconButton style={{ color: '#fff', marginRight: '50px' }} aria-label="facebook">
                    <Facebook />
                  </IconButton>
                  <IconButton style={{ color: '#fff', marginRight: '50px' }} aria-label="twitter">
                    <Twitter />
                  </IconButton>
                  <IconButton style={{ color: '#fff', marginRight: '50px' }} aria-label="instagram">
                    <Instagram />
                  </IconButton>
                  <IconButton style={{ color: '#fff' }} aria-label="linkedin">
                    <LinkedIn />
                  </IconButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
