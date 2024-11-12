import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card, Modal, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa'; // For edit and delete icons
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs'; // Dark/Light Mode icons

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProperty, setEditProperty] = useState(null);
  const [formData, setFormData] = useState({
    propertyAddress: '',
    propertyAmt: '',
    propertyImage: '',
    additionalInfo: ''
  });
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  useEffect(() => {
    const fetchOwnerProperties = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/owners/properties', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      }
    };
    fetchOwnerProperties();
  }, []);

  const handleAddProperty = async () => {
    try {
      const response = await axios.post('http://localhost:8001/api/owners/properties', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProperties([...properties, response.data]);
      setShowModal(false);
      setFormData({
        propertyAddress: '',
        propertyAmt: '',
        propertyImage: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Failed to add property:', error);
    }
  };

  const handleEditProperty = async (propertyId) => {
    try {
      const response = await axios.put(`http://localhost:8001/api/owners/properties/${propertyId}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const updatedProperties = properties.map((property) =>
        property._id === propertyId ? response.data : property
      );
      setProperties(updatedProperties);
      setShowModal(false);
    } catch (error) {
      console.error('Failed to edit property:', error);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:8001/api/owners/properties/${propertyId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProperties(properties.filter((property) => property._id !== propertyId));
    } catch (error) {
      console.error('Failed to delete property:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (property = null) => {
    if (property) {
      setFormData({
        propertyAddress: property.propertyAddress,
        propertyAmt: property.propertyAmt,
        propertyImage: property.propertyImage,
        additionalInfo: property.additionalInfo
      });
      setEditProperty(property);
    } else {
      setFormData({
        propertyAddress: '',
        propertyAmt: '',
        propertyImage: '',
        additionalInfo: ''
      });
      setEditProperty(null);
    }
    setShowModal(true);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Container fluid className={`p-4 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-3xl font-bold">Manage Your Properties</h2>
        <Button
          variant="outline-light"
          onClick={toggleDarkMode}
          className="p-2 rounded-circle"
          style={{ fontSize: '1.5rem' }}
        >
          {darkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
        </Button>
      </div>

      <div className="text-right mb-6">
        <Button
          className={`bg-primary text-white px-2 py-6 xmb-4 rounded-lg shadow-md ${darkMode ? 'hover:bg-secondary' : ''}`}
          onClick={() => openModal()}
        >
          Add Property
        </Button>
      </div>

      <Row className="g-4">
        {properties.map((property) => (
          <Col key={property._id} md={4} sm={6}>
            <Card className={`shadow-lg rounded-lg transition-all duration-300 ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}>
              <Card.Img
                variant="top"
                src={property.propertyImage || 'https://via.placeholder.com/300'}
                className="rounded-t-lg"
                alt="Property Image"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title className="text-xl font-semibold">{property.propertyAddress}</Card.Title>
                <Card.Text className="text-muted">Price: ${property.propertyAmt}</Card.Text>
                <Card.Text>{property.additionalInfo}</Card.Text>
                <div className="d-flex justify-content-between mt-3">
                  <Button
                    variant="warning"
                    className="px-4 py-2 text-white rounded-lg"
                    onClick={() => openModal(property)}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="px-4 py-2 text-white rounded-lg"
                    onClick={() => handleDeleteProperty(property._id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Adding/Editing Property */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editProperty ? 'Edit Property' : 'Add Property'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="propertyAddress">
              <Form.Label>Property Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter property address"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="propertyAmt">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter property price"
                name="propertyAmt"
                value={formData.propertyAmt}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="propertyImage">
              <Form.Label>Property Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter property image URL"
                name="propertyImage"
                value={formData.propertyImage}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="additionalInfo">
              <Form.Label>Additional Information</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter additional information"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={editProperty ? () => handleEditProperty(editProperty._id) : handleAddProperty}
          >
            {editProperty ? 'Save Changes' : 'Add Property'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OwnerDashboard;
