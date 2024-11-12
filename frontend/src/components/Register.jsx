import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { TextField, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Renter'); // Assuming role is 'Renter' by default
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8001/register', {
        name,
        email,
        password,
        role
      });
  
      if (response.status === 201) {
        // Redirect or success action
        navigate('/login');
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : 'Error registering user');
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
            Register
          </Typography>
          <Typography variant="subtitle1" align="center" style={{ color: '#888', marginBottom: '1.5rem' }}>
            Create your account
          </Typography>

          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

          <form onSubmit={handleRegister} className="mt-3">
            {/* Name Field */}
            <TextField
              type="text"
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              className="mb-3"
              style={{ borderRadius: '5px' }}
            />
            {/* Email Field */}
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
            {/* Password Field */}
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
            {/* Role Field */}
            <TextField
              type="text"
              label="Role"
              variant="outlined"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              className="mb-3"
              style={{ borderRadius: '5px' }}
            />
            {/* Submit Button */}
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
              Register
            </Button>
          </form>
        </Card>
      </Container>
    </div>
  );
}

export default RegisterPage;
