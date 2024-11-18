import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Nav, Table, Badge, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProperty, setNewProperty] = useState({
    propertyType: '',
    propertyAdType: '',
    propertyAddress: '',
    ownerContact: '',
    propertyAmt: '',
    propertyImage: '',
    additionalInfo: ''
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = token ? jwtDecode(token).userId : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertiesRes] = await Promise.all([
          fetch(`http://localhost:8000/api/properties/${userId}`)
        ]);
        const propertiesData = await propertiesRes.json();
        setProperties(propertiesData);
        toast.success('Properties loaded successfully!');
      } catch (err) {
        toast.error('Error loading properties: ' + err.message);
      }
    };
    if (userId) fetchData();
    fetchBookings();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Logged out successfully');
    navigate('/signin');
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/addproperties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProperty, ownerId: userId })
      });
      const data = await response.json();
      setProperties((prev) => [...prev, data]);
      setShowModal(false);
      toast.success('Property added successfully!');
      setNewProperty({
        propertyType: '',
        propertyAdType: '',
        propertyAddress: '',
        ownerContact: '',
        propertyAmt: '',
        propertyImage: '',
        additionalInfo: ''
      });
    } catch (err) {
      toast.error('Error adding property: ' + err.message);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/bookings/${userId}`);
      setBookings(response.data);
      toast.success('Bookings loaded successfully!');
    } catch (error) {
      toast.error('Error loading bookings: ' + error.message);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/api/bookings/${bookingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId, status: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
          toast.success('Booking status updated successfully!');
          // Refresh bookings or update state
      } else {
          toast.error(data.message || 'Failed to update booking status');
      }
  } catch (err) {
      toast.error('Error updating booking status: ' + err.message);
  }
  };

  const renderFormInput = (label, field, type = 'text', required = true) => (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        value={newProperty[field]}
        onChange={(e) => setNewProperty({ ...newProperty, [field]: e.target.value })}
        required={required}
        className="shadow-sm"
      />
    </Form.Group>
  );

  const renderAddPropertyModal = () => (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddProperty}>
          {renderFormInput('Property Type', 'propertyType')}
          {renderFormInput('Ad Type', 'propertyAdType')}
          {renderFormInput('Address', 'propertyAddress')}
          {renderFormInput('Contact', 'ownerContact')}
          {renderFormInput('Amount', 'propertyAmt', 'number')}
          {renderFormInput('Image URL', 'propertyImage', 'url', false)}
          {renderFormInput('Additional Info', 'additionalInfo', 'text', false)}
          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            style={{ backgroundColor: '#334155', borderColor: '#334155' }}
          >
            Add Property
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );

  const renderProperties = () => (
    <Row className="g-4">
      {properties.map((property) => (
        <Col key={property._id} lg={4} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-100 shadow-sm hover-shadow">
              <Card.Img 
                variant="top" 
                src={property.propertyImage} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{property.propertyType}</Card.Title>
                <Card.Text>
                  <p><strong>Address:</strong> {property.propertyAddress}</p>
                  <p><strong>Amount:</strong> ${property.propertyAmt}</p>
                  <p><strong>Ad Type:</strong> {property.propertyAdType}</p>
                  <p><strong>Contact:</strong> {property.ownerContact}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );

  const renderBookings = () => (
    <Card className="shadow-sm">
      <Card.Body>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Tenant</th>
              <th>Contact</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <motion.tr
                key={booking._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td>{booking.tenantName}</td>
                <td>{booking.tenantContact}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>
                <Badge bg={
                  booking.status === 'Confirmed' ? 'success' :
                  booking.status === 'Rejected' ? 'danger' : 'warning'
                }>
                  {booking.status}
                </Badge>
              </td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => updateBookingStatus(booking.userId, 'Confirmed')}
                  disabled={booking.status !== 'Pending'}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => updateBookingStatus(booking.userId, 'Rejected')}
                  disabled={booking.status !== 'Pending'}
                >
                  Reject
                </Button>
              </td>
              </motion.tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark mb-4" style={{ backgroundColor: '#1E293B' }}>
        <Container>
          <span className="navbar-brand">Owner Dashboard</span>
          <Button 
            variant="outline-light" 
            onClick={handleLogout}
            style={{ borderColor: '#E2E8F0', color: '#E2E8F0' }}
          >
            Logout
          </Button>
        </Container>
      </nav>

      <Container>
        {/* Navigation Tabs */}
        <Nav variant="tabs" className="mb-4" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'properties'}
              onClick={() => setActiveTab('properties')}
              style={activeTab === 'properties' ? 
                { backgroundColor: '#334155', color: '#F8FAFC', borderColor: '#E2E8F0' } : 
                { color: '#475569' }}
            >
              My Properties
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'bookings'}
              onClick={() => setActiveTab('bookings')}
              style={activeTab === 'bookings' ? 
                { backgroundColor: '#334155', color: '#F8FAFC', borderColor: '#E2E8F0' } : 
                { color: '#475569' }}
            >
              Bookings
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Add Property Button */}
        <div className="d-flex justify-content-end mb-4">
          <Button 
            variant="primary" 
            onClick={() => setShowModal(true)}
            style={{ backgroundColor: '#334155', borderColor: '#334155' }}
          >
            Add New Property
          </Button>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'properties' && renderProperties()}
          {activeTab === 'bookings' && renderBookings()}
        </motion.div>

        {/* Add Property Modal */}
        {renderAddPropertyModal()}
      </Container>

      {/* Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Custom CSS */}
      <style jsx>{`
        .hover-shadow:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
        }
        .card {
          transition: all 0.3s ease;
          border-color: #E2E8F0;
        }
        .nav-tabs .nav-link:hover:not(.active) {
          color: #334155;
          border-color: #E2E8F0;
        }
        .table {
          color: #1E293B;
        }
        .table thead {
          background-color: #F8FAFC;
        }
        .table thead th {
          border-bottom-color: #E2E8F0;
        }
        .table td, .table th {
          border-color: #E2E8F0;
        }
        .modal-content {
          background-color: #F8FAFC;
          border-color: #E2E8F0;
        }
        .modal-header {
          border-bottom-color: #E2E8F0;
        }
        .form-control {
          border-color: #E2E8F0;
        }
        .form-control:focus {
          border-color: #334155;
          box-shadow: 0 0 0 0.2rem rgba(51, 65, 85, 0.25);
        }
      `}</style>
    </div>
  );
};

export default OwnerDashboard;