// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
// import HeroSection from '../src/components/HeroSection';
// // import NavBar from './components/MyNavbar';
// import OwnerDashboard from './components/OwnerDashboard';
// import RenterDashboard from './components/RenterDashboard';
// import AdminDashboard from './components/AdminDashboard';
// import Header from './components/Header';

// import Login from './components/Login';
// import Register from './components/Register';
// import Home from './components/Home';

// const App = () => {
//   return (
   

   
//     <Router>
//       <Route path="*" element={
//         <>
//         < Header/>
//         <Routes path="" element={
//           <>
//           <HeroSection />
//           <Home />
//           </>
//         }></Routes>
//           </>

//       }>
        
//       </Route>
//       {/* <NavBar /> This will show the Navbar on every page */}
//       <Container>
//         <Routes>
//           {/* Homepage Route */}

//           {/* Authentication Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register/>} />

//           {/* Dashboard Routes */}
//           <Route path="/owner-dashboard" element={<OwnerDashboard />} />
//           <Route path="/renter-dashboard" element={<RenterDashboard />} />
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         </Routes>
//       </Container>
//     </Router>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import HeroSection from './components/HeroSection';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import OwnerDashboard from './components/OwnerDashboard';
import RenterDashboard from './components/RenterDashboard'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/renter-dashboard" element={<RenterDashboard />} /> 


          <Route path="*" element={
            <>
              <Header />
              <Routes>
                <Route path="" element={
                  <>
                    <HeroSection />
                    <Home />
                  </>
                } />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>}/>
              </Routes>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;