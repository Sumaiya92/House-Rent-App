import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import SignIn from "./components/LoginPage"
import SignUp from "./components/RegisterPage";
import HeroSection from "./components/Hero";
import AdminDashboard from "./components/AdminDashBoard";
import OwnerDashboard from "./components/OwnerDashBoard";
import RenterDashboard from "./components/RenterDashBoard";
import { UserProvider } from "./components/Context/useContext"; // Wrapping with context provider

function App() {
  return (
    <UserProvider> {/* Ensure context is available for the entire app */}
      <Router>
        <div className="App">
          <Routes>
            {/* Dashboard Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/renter-dashboard" element={<RenterDashboard />} />

            {/* Catch-All Route with Header */}
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <Routes>
                    {/* Nested Routes */}
                    <Route
                      path=""
                      element={
                        <>
                          <HeroSection />
                          <Home />
                        </>
                      }
                    />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
