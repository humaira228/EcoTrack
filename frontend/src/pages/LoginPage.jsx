import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  Modal,
  TextField,
  Typography,
  Link as MuiLink,
  InputAdornment,
  Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Simulate user credentials (you'll normally call your API here)
const mockUser = {
  email: 'user@example.com',
  password: 'password123',
};

const Login = () => {
  // State for form fields and validation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email format
    if (!emailRegex.test(email)) {
      setModalMessage('Please enter a valid email.');
      setOpenModal(true);
      return;
    }

    // Check if email and password match mock data (simulate DB validation)
    if (email === mockUser.email && password === mockUser.password) {
      alert('Logged in successfully!');
      // Redirect to homepage (use React Router for actual navigation)
      // window.location.href = '/homepage'; // Replace with your homepage route
    } else {
      setModalMessage('Invalid email or password.');
      setOpenModal(true);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#4CAF50' }}>
      {/* Title */}
      <Box sx={{ py: { xs: 4, md: 6 }, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: 'white',
            fontWeight: 800,
            letterSpacing: 0.5,
            fontFamily:
              'Poppins, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
          }}
        >
          Welcome to EcoTrack
        </Typography>
      </Box>

      <Container component="main" maxWidth="xs">
        <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Heading */}
            <Typography variant="h5" component="h2" gutterBottom>
              Sign In
            </Typography>

            {/* Form */}
            <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
              {/* Email */}
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password */}
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Remember Me */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    name="rememberMe"
                  />
                }
                label="Remember Me"
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </Box>

            {/* Registration Box */}
            {/* Registration Box */}
            <MuiLink
              href="/register"
              underline="none"
              color="inherit"
              sx={{
                display: 'block',
                width: '100%',
                mt: 2.5,
                p: 2,
                borderRadius: 2,
                border: '1px dashed',
                borderColor: 'divider',
                textAlign: 'center',
                transition: 'transform 120ms ease, box-shadow 120ms ease',
                cursor: 'pointer',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
              }}
            >
              <Typography variant="subtitle1" fontWeight={700}>
                New here?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create an account to start tracking sustainably
              </Typography>
            </MuiLink>
          </Box>
        </Paper>
      </Container>

      {/* Modal for Error */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 4,
            boxShadow: 3,
            width: '90%',
            maxWidth: 420,
          }}
        >
          <Typography variant="h6">{modalMessage}</Typography>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => setOpenModal(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Login;
