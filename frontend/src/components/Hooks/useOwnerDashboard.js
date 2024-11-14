import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const useOwnerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]); // State for bookings
  const [formData, setFormData] = useState({
    propertyAddress: '',
    propertyAmt: '',
    propertyImage: '',
    additionalInfo: '',
    propertyType: '',
    propertyAdType: '',
    ownerContact: '',
    ownerName: ''
  });
  const [selectedTab, setSelectedTab] = useState('addProperty');
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      console.log(userId);
      setOwnerId(userId);

      fetchOwnerProperties(userId);
      fetchOwnerBookings(userId); // Fetch bookings for the owner
    }
  }, []);

  const fetchOwnerProperties = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8001/api/owners/properties/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Failed to fetch properties for the owner:', error);
    }
  };

  const fetchOwnerBookings = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8001/api/owners/owner/bookings/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Include token if required
        }
      });
      setBookings(response.data); // Store bookings in state
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      // console.log("booking id",bookingId)
      const response = await axios.put(`http://localhost:8001/api/owners/owner/bookings/${bookingId}`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const updatedBookings = bookings.map((booking) =>
        booking._id === bookingId ? response.data.booking : booking
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  const handleAddProperty = async () => {
    try {
      const response = await axios.post('http://localhost:8001/api/owners/properties', {
        ...formData,
        ownerId
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setProperties([...properties, response.data.property]);
      // Reset form data
      setFormData({
        propertyAddress: '',
        propertyAmt: '',
        propertyImage: '',
        additionalInfo: '',
        propertyType: '',
        propertyAdType: '',
        ownerContact: '',
        ownerName: ''
      });
    } catch (error) {
      console.error('Failed to add property:', error);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:8001/api/owners/properties/${propertyId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      // Remove the deleted property from the state
      setProperties(properties.filter((property) => property._id !== propertyId));
    } catch (error) {
      console.error('Failed to delete property:', error);
    }
  };

  return {
    properties,
    bookings, // Expose bookings state
    formData,
    selectedTab,
    setSelectedTab,
    handleUpdateBookingStatus,
    handleAddProperty,
    handleDeleteProperty,
    handleChange: (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  };
};

