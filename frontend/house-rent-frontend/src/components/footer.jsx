import React from 'react';
import './footer.css'; // Import the corresponding CSS for the footer styles

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <section className="about-section">
          <h3>About MySpark</h3>
          <p className="description">
            MySpark is a dynamic and user-friendly platform designed to help you find your perfect rental property.
            Whether you're searching for a cozy apartment, a spacious house, or a luxurious villa, we have something for everyone.
            With our easy-to-use interface, you can browse, filter, and discover properties that suit your needs and budget.
            Join the MySpark community and start your rental journey today!
          </p>
        </section>

        <section className="contact-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p>Email: <a href="mailto:contact@myspark.com">contact@myspark.com</a></p>
            <p>Phone: <a href="tel:+1234567890">+123 456 7890</a></p>
            <p>Follow us on Instagram: <a href="https://www.instagram.com/myspark" target="_blank" rel="noopener noreferrer">MySpark Instagram</a></p>
          </div>
        </section>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 MySpark. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
