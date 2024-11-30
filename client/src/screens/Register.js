import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon } from '@mui/icons-material'; // Material UI Icons
import Footer from '../components/Footer';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    if (user.password === user.confirmPassword) {
      try {
        const response = await axios.post('http://localhost:5000/api/users/register', {
          name: user.name,
          email: user.email,
          password: user.password,
        });

        setMessage(response.data.message || 'You registered successfully.');
      } catch (error) {
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : 'Registration failed. Please try again.'
        );
      }
    } else {
      setError('Passwords do not match.');
    }

    setLoading(false);
  };

  const handleSocialRegister = (provider) => {
    const url = `http://localhost:5000/api/users/auth/${provider}`;
    window.location.href = url;
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
          <Typography variant="h3" align="center" fontFamily="Dancing Script">
            Register
          </Typography>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  name="confirmPassword"
                  type="password"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Box mt={2} position="relative">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
              </Button>
            </Box>
          </form>
          {message && (
            <Typography
              variant="body1"
              color="primary"
              align="center"
              style={{ marginTop: 10 }}
            >
              {message}
            </Typography>
          )}
          {error && (
            <Typography
              variant="body1"
              color="error"
              align="center"
              style={{ marginTop: 10 }}
            >
              {error}
            </Typography>
          )}

          <Typography variant="body1" align="center" style={{ margin: '20px 0' }}>
            Or register using
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialRegister('google')}
              >
                Google
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<FacebookIcon />}
                onClick={() => handleSocialRegister('facebook')}
              >
                Facebook
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <br />
      <Footer />
    </Box>
  );
};

export default Register;
