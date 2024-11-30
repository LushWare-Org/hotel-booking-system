import React, { useState, useEffect } from 'react';
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
import { Google as GoogleIcon, Facebook as FacebookIcon } from '@mui/icons-material';
import axios from 'axios';
import Footer from '../components/Footer';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Load message from localStorage if redirected post-register
    useEffect(() => {
        const storedMessage = localStorage.getItem('loginMessage');
        if (storedMessage) {
            setMessage(storedMessage);
            localStorage.removeItem('loginMessage'); // Clear the message
        }
    }, []);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(''); // Clear previous messages

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email: credentials.email,
                password: credentials.password,
            });

            const { token, user } = response.data;

            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('token', token);

            // Redirect to dashboard/home
            setMessage(`Hello ${user.name}, you're successfully logged in.`);
            window.location.href = '/'; 
        } catch (error) {
            console.error('Login error:', error.response || error.message);
            setMessage(
                error.response?.data?.message || 'Login failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        const url = `http://localhost:5000/api/users/auth/${provider}`;
        window.location.href = url;
    };

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <Container component="main" maxWidth="xs" style={{ flexGrow: 1 }}>
                <br />
                <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
                    <Typography variant="h3" align="center" fontFamily="Dancing Script">
                        Login
                    </Typography>
                    <br />
                    <form onSubmit={handleLogin}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    name="email"
                                    type="email"
                                    value={credentials.email}
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
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: 20 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                    </form>
                    <Typography variant="body1" align="center" style={{ margin: '20px 0' }}>
                        Or login using
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                startIcon={<GoogleIcon />}
                                onClick={() => handleSocialLogin('google')}
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
                                onClick={() => handleSocialLogin('facebook')}
                            >
                                Facebook
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                {message && (
                    <Typography
                        variant="body1"
                        align="center"
                        style={{
                            color: message.startsWith('Hello') ? 'green' : 'red',
                            marginTop: 20,
                        }}
                    >
                        {message}
                    </Typography>
                )}
                <br />
                <br />
            </Container>
            <Footer />
        </Box>
    );
};

export default Login;
