import React from "react";
import "./home.css";
import Footer from "./footer";

function HomeSection() {
  return (
    <section className="home-section">
      {/* Trending Properties Section */}
      <h2 className="trending-title">Trending Properties</h2>
      <div className="trending-properties">
  <div className="property-card">
    <img
      src="https://wallpaperaccess.com/full/1700246.jpg"
      alt="Property 1"
      className="property-image"
    />
    <div className="property-details">
      <h3 className="property-title">Modern Seaside Villa</h3>
      <p className="property-description">
        Experience luxury by the beach with this fully furnished villa offering stunning ocean views and private access to the shore.
      </p>
    </div>
  </div>
  <div className="property-card">
    <img
      src="https://wallpaperaccess.com/full/2629775.jpg"
      alt="Property 2"
      className="property-image"
    />
    <div className="property-details">
      <h3 className="property-title">Penthouse in Downtown</h3>
      <p className="property-description">
        A lavish penthouse located in the city center, featuring panoramic skyline views and top-notch amenities.
      </p>
    </div>
  </div>
  <div className="property-card">
    <img
      src="https://wallpaperaccess.com/full/1218249.jpg"
      alt="Property 3"
      className="property-image"
    />
    <div className="property-details">
      <h3 className="property-title">Charming Country Villa</h3>
      <p className="property-description">
        Escape to serenity in this picturesque villa surrounded by lush greenery and peaceful landscapes.
      </p>
    </div>
  </div>
  <div className="property-card">
    <img
      src="https://th.bing.com/th/id/OIP.D1Sqr6pni4cPbDipu_q66QHaE7?rs=1&pid=ImgDetMain"
      alt="Property 4"
      className="property-image"
    />
    <div className="property-details">
      <h3 className="property-title">Lakeside Cabin</h3>
      <p className="property-description">
        A cozy lakeside cabin perfect for weekend getaways, complete with a private deck and breathtaking sunset views.
      </p>
    </div>
  </div>
  <div className="property-card">
    <img
      src="https://th.bing.com/th/id/OIP.rf2xPSgxwWEWubqtbruGVAHaDt?rs=1&pid=ImgDetMain"
      alt="Property 5"
      className="property-image"
    />
    <div className="property-details">
      <h3 className="property-title">Suburban Family Home</h3>
      <p className="property-description">
        A spacious and modern family home in a quiet suburb, close to schools, parks, and shopping centers.
      </p>
    </div>
  </div>
  <div className="property-card">
    <img
      src="https://i.pinimg.com/originals/76/10/95/761095dd6c04fd9ad39bb30670a85586.jpg"
      alt="Property 6"
      className="property-image"
    />
    <div className="property-details">
      <h3 className="property-title">Rustic Mountain Retreat</h3>
      <p className="property-description">
        A beautifully crafted mountain retreat, perfect for nature enthusiasts and adventure seekers.
      </p>
    </div>
  </div>
</div>


      {/* Fun Facts Section */}
      <h2 className="fun-facts-title">Fun Facts</h2>
      <div className="fun-facts">
        <div className="fact-card">
          <h3 className="fact-title">Rent Prices Vary by Location</h3>
          <p className="fact-description">
            Rental prices can vary dramatically depending on the city or
            neighborhood. Renting in the city center may cost 2-3 times more
            than in the suburbs!
          </p>
        </div>
        <div className="fact-card">
          <h3 className="fact-title">Did you know?</h3>
          <p className="fact-description">
          Our users report a 90% satisfaction rate when finding rental homes through 
          our app!
          </p>
        </div>
        <div className="fact-card">
          <h3 className="fact-title">Pet-Friendly Properties Are in Demand</h3>
          <p className="fact-description">
            Many renters seek pet-friendly properties. It can make a big
            difference in attracting tenants with pets.
          </p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </section>
   
  );
}

export default HomeSection;
