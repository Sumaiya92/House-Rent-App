import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [bookingDetails, setBookingDetails] = useState({ name: '', contact: '' });

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/owners/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Failed to fetch property details:', error);
      }
    };
    fetchPropertyDetails();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8001/api/users/booking', {
        propertyId: id,
        renterId: localStorage.getItem('userId'), // Retrieve userId from localStorage or context
        ...bookingDetails
      });
      alert('Booking Request Sent!');
    } catch (error) {
      console.error('Failed to send booking request:', error);
    }
  };

  return (
    <Container>
      <h2>Property Details</h2>
      <h4>{property.propertyAddress}</h4>
      <p>Price: ${property.propertyAmt}</p>
      <p>{property.additionalInfo}</p>
      <Form onSubmit={handleBooking}>
        <Form.Group controlId="formName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={bookingDetails.name}
            onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formContact">
          <Form.Label>Your Contact</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your contact details"
            value={bookingDetails.contact}
            onChange={(e) => setBookingDetails({ ...bookingDetails, contact: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send Booking Request
        </Button>
      </Form>
    </Container>
  );
};

export default PropertyDetails;
