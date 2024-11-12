// Function to handle login
// src/utils/auth.js

  
export async function login(username, password) {
    try {
      const response = await fetch("https://your-api.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
      console.log("Login successful:", data);
  
      // Store the token in localStorage
      localStorage.setItem("authToken", data.token);
      console.log("Token stored successfully");
  
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  
  // Function to make an authenticated request
  export async function fetchProtectedData() {
    try {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        throw new Error("No token found. Please log in first.");
      }
  
      const response = await fetch("https://your-api.com/protected-route", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch protected data");
      }
  
      const data = await response.json();
      console.log("Protected data:", data);
  
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  
  // Usage example
  // Call login with actual credentials
  login("yourUsername", "yourPassword");
  
  // Then, call the fetchProtectedData function to access a protected route
  fetchProtectedData();
  