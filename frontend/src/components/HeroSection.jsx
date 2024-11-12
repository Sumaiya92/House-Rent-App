import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function HeroSection() {
  return (
    <section className="d-flex align-items-center justify-content-center vh-100 text-white position-relative"
             style={{ backgroundImage: "url('https://th.bing.com/th/id/OIP.7Szg6T2mxXud0dSv0HDMYQHaD_?rs=1&pid=ImgDetMain')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-dark bg-opacity-75 p-5 rounded-3 shadow-lg text-center">
        <h1 className="display-4 fw-bold text-uppercase mb-4">RentEase</h1>
        <p className="fs-5 opacity-90 mb-4">
          Find your perfect rental property today!
        </p>
        <button className="btn btn-lg text-white" style={{
          width: '40%',
          height: '50px',
          background: 'linear-gradient(90deg, #ff6a00, #ee0979)',
          border: 'none',
          borderRadius: '30px',
          transition: 'transform 0.3s, box-shadow 0.3s'
        }}
        onMouseOver={e => {
          e.target.style.background = 'linear-gradient(90deg, #ee0979, #ff6a00)';
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
        }}
        onMouseOut={e => {
          e.target.style.background = 'linear-gradient(90deg, #ff6a00, #ee0979)';
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = 'none';
        }}>
          Get Started
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
