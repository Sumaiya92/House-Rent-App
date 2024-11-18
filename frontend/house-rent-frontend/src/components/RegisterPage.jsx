import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../components/Context/useContext"; // Import useUser

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Renter");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useUser(); // Get the updateUser function from context

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", {
        name,
        email,
        password,
        role,
        phoneNumber,
      });
      if (response.status === 201) {
        // After successful registration, update the user context
        updateUser(name); 
        navigate("/signin"); // Redirect to login
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error registering user");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Register</h2>
        <p style={styles.subHeading}>Create your account</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleRegister}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
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
          <div style={styles.inputContainer}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
              <option value="Renter">Renter</option>
              <option value="Owner">Owner</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" style={styles.button}>Register</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f7fc" },
  card: { backgroundColor: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "400px" },
  heading: { textAlign: "center", fontWeight: "600", color: "#283048" },
  subHeading: { textAlign: "center", color: "#888", marginBottom: "1.5rem" },
  error: { color: "red", fontSize: "14px", textAlign: "center", marginBottom: "1rem" },
  inputContainer: { marginBottom: "1rem" },
  label: { display: "block", marginBottom: "0.5rem", fontSize: "14px", color: "#333" },
  input: { width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px", color: "#333" },
  button: { width: "100%", padding: "10px", borderRadius: "5px", backgroundColor: "#283048", color: "white", fontWeight: "bold", fontSize: "16px", border: "none", cursor: "pointer" },
};

export default RegisterPage;
