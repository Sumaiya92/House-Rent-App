import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js'; // Import your configured Axios instance
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { TextField, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.token && response.data.role) {
        const { token, role } = response.data;
        localStorage.setItem('token', token);
        if (role === 'Renter') {
          navigate('/renter-dashboard');
        } else if (role === 'Owner') {
          navigate('/owner-dashboard');
        } else {
          navigate('/admin-dashboard');
        }
      } else {
        setError('Unexpected response from server');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container style={{ maxWidth: '400px' }}>
        <Card className="p-4 shadow-sm" style={{ borderRadius: '10px', backgroundColor: 'white' }}>
          <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: '600', color: '#283048' }}>
            Login
          </Typography>
          <Typography variant="subtitle1" align="center" style={{ color: '#888', marginBottom: '1.5rem' }}>
            Sign in to your account
          </Typography>

          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

          <form onSubmit={handleLogin} className="mt-3">
            <TextField
              type="email"
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              className="mb-3"
              style={{ borderRadius: '5px' }}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              className="mb-3"
              style={{ borderRadius: '5px' }}
            />
            <Button
              type="submit"
              className="w-100 mt-3"
              style={{
                backgroundColor: '#283048',
                borderColor: '#283048',
                color: 'white',
                fontSize: '16px',
                padding: '10px 0',
                borderRadius: '5px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#1d2b3a')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#283048')}
            >
              Login
            </Button>
          </form>
        </Card>
      </Container>
    </div>
  );
}

export default LoginPage;
