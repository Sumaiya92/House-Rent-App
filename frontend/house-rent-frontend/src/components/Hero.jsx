import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Slider from 'react-slick'; // Import react-slick for the carousel
import 'slick-carousel/slick/slick.css'; // Import slick carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick theme CSS

function Hero() {
  // Image data for the carousel
  const images = [
    "https://wallpaperaccess.com/full/2315968.jpg",
    "https://ww1.prweb.com/prfiles/2013/12/30/11510629/CCR-Representative-Exterior.jpg",
    "https://wallpapercave.com/wp/wp3982615.jpg",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg",
    "https://i.pinimg.com/originals/22/80/13/228013d23c2ca5ed80a74c6bfd6da3e2.jpg",
    "https://villaphoto.com/wp-content/uploads/2022/03/Castil-di-Udara-Pool-Evening-5.jpg"
 
  ];

  // Settings for the carousel
  const settings = {
    dots: true,            // Show navigation dots
    infinite: true,        // Infinite loop of images
    speed: 500,            // Slide transition speed
    slidesToShow: 4,       // Show 1 slide at a time
    slidesToScroll: 1,     // Scroll 1 slide at a time
    autoplay: true,        // Enable autoplay
    autoplaySpeed: 1000,   // Transition every 2 seconds
  };

  return (
    <div>
      <section 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Full viewport height
          width: '100vw',  // Full viewport width
          position: 'relative',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.75)',
          color: 'white',
        }}
      >
        {/* Carousel */}
        <Slider {...settings} style={{ width: '100%', position: 'absolute', height: '100%' }}>
          {images.map((img, index) => (
            <div key={index}>
              <img 
                src={img} 
                alt={`carousel-image-${index}`} 
                style={{ 
                  width: '100%', 
                  height: '800px', // Set a fixed height for all images
                  objectFit: 'cover', // Ensures images cover the area without stretching
                }} 
              />
            </div>
          ))}
        </Slider>

        {/* Hero Content */}
        <div 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <h1 
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            MySpark
          </h1>
          <p 
            style={{
              fontSize: '1.25rem',
              opacity: '0.9',
              marginBottom: '1.5rem',
            }}
          >
            Find your perfect rental property today!
          </p>
          <Link to="/signup">
            <button 
              style={{
                width: '40%',
                height: '50px',
                background: 'linear-gradient(90deg, #ff6a00, #ee0979)',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'linear-gradient(90deg, #ee0979, #ff6a00)';
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'linear-gradient(90deg, #ff6a00, #ee0979)';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Hero;
