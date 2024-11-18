import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Axios instance for API calls

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('http://localhost:8000/api/auth/login', { email, password });
      const { token, role } = response.data;

      if (token && role) {
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
      setError('Invalid email or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <p style={styles.subHeading}>Sign in to your account</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7fc' },
  card: { backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' },
  heading: { textAlign: 'center', fontWeight: '600', color: '#283048' },
  subHeading: { textAlign: 'center', color: '#888', marginBottom: '1.5rem' },
  error: { color: 'red', fontSize: '14px', textAlign: 'center', marginBottom: '1rem' },
  inputContainer: { marginBottom: '1rem' },
  label: { display: 'block', marginBottom: '0.5rem', fontSize: '14px', color: '#333' },
  input: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '14px', color: '#333' },
  button: { width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#283048', color: 'white', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer' },
};

export default LoginPage;
