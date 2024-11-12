import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ property, closeForm }) => {
  const [tenantName, setTenantName] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [bookingDetails, setBookingDetails] = useState('');
  const [error, setError] = useState('');

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You need to be logged in');
      return;
    }

    const bookingData = {
      propertyId: property._id,
      tenantName,
      tenantPhone,
      bookingDetails,
    };

    axios.post('http://localhost:8001/api/users/book-property', bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        alert('Booking successful!');
        closeForm(); // Close the form after booking
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Booking failed');
      });
  };

  return (
    <div>
      <h3>Booking Form for {property.propertyAddress}</h3>
      <form onSubmit={handleBookingSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={tenantName} onChange={(e) => setTenantName(e.target.value)} required />
        </div>
        <div>
          <label>Phone</label>
          <input type="text" value={tenantPhone} onChange={(e) => setTenantPhone(e.target.value)} required />
        </div>
        <div>
          <label>Booking Details</label>
          <textarea value={bookingDetails} onChange={(e) => setBookingDetails(e.target.value)} required />
        </div>
        <button type="submit">Submit Booking</button>
        {error && <p>{error}</p>}
      </form>
      <button onClick={closeForm}>Close</button>
    </div>
  );
};

export default BookingForm;
