import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Container, Row, Col, Modal, Form } from "react-bootstrap";
import { FaBed, FaMoneyBillAlt, FaInfoCircle } from "react-icons/fa";
import {jwtDecode} from "jwt-decode";
import './renter.css';

const RenterDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('allProperties');
  const [renterDetails, setRenterDetails] = useState({ fullname: "", contact: "" });
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingData, setBookingData] = useState(null);
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);
  const navigate = useNavigate();

  // Fetch properties and user data on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    

    if (token) {
      axios
        .get("http://localhost:8001/api/owners/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProperties(response.data);
        })
        .catch((error) => {
          console.log("Error fetching properties: ", error);
          if (error.response && error.response.status === 401) {
            navigate("/login");
          }
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    setIsBookingSubmitted(true); // Set to trigger useEffect
  };

  // Booking logic in useEffect triggered by isBookingSubmitted
  useEffect(() => {
    console.log(selectedProperty)
    if (isBookingSubmitted) {
      const token = localStorage.getItem("token");
     
      if (token) {
        
        const decodedToken = jwtDecode(token);
        console.log(decodedToken)
        const renterId = decodedToken.userId;
        console.log(renterId)

        const bookingData = {
          propertyId: selectedProperty._id,
          renterId,
          bookingDetails: {
            tenantName: renterDetails.name,
            tenantContact: renterDetails.contact,
            bookingDate: new Date(),
            additionalInfo: "", // Add any additional info if needed
          },
        };

        axios
          .post("http://localhost:8001/api/users/book-property", bookingData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setBookingData(response.data.booking);
            setBookingStatus("Your booking is now pending approval.");
            setShowModal(false);
          })
          .catch((error) => {
            setBookingStatus("Failed to submit booking. Please try again.");
            console.log("Error submitting booking:", error.response.data);
          })
          .finally(() => {
            setIsBookingSubmitted(false); // Reset to prevent re-triggering
          });
      }
    }
  }, [isBookingSubmitted, selectedProperty, renterDetails]);

  // Automatically hide booking status message after 5 seconds
  useEffect(() => {
    if (bookingStatus) {
      const timer = setTimeout(() => {
        setBookingStatus("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [bookingStatus]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // Component for rendering properties
  const PropertyList = () => (
    <div>
      <Container>
        <h1 className="text-center my-4">Available Properties</h1>
        <Row className="g-3">
          {properties.length > 0 ? (
            properties.map((property) => (
              <Col key={property._id} md={4} sm={6}>
                <Card className="shadow-sm rounded border-light">
                  <Card.Img
                    variant="top"
                    src={property.propertyImage || "https://via.placeholder.com/150"}
                    alt={property.propertyAddress}
                    className="card-img-top"
                  />
                  <Card.Body>
                    <Card.Title>{property.propertyAddress}</Card.Title>
                    <Card.Text>
                      <FaMoneyBillAlt /> ${property.propertyAmt}
                      <br />
                      <FaBed /> {property.propertyType}
                    </Card.Text>
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="outline-primary"
                        onClick={() => handlePropertyClick(property)}
                        className="w-75"
                      >
                        <FaInfoCircle /> Get Info
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No properties available at the moment.</p>
          )}
        </Row>

        {bookingStatus && (
          <div className="alert alert-info mt-4 text-center">{bookingStatus}</div>
        )}

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProperty?.propertyAddress}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card.Text>
              <strong>Price:</strong> ${selectedProperty?.propertyAmt}
              <br />
              <strong>Type:</strong> {selectedProperty?.propertyType}
              <br />
              <strong>Description:</strong> {selectedProperty?.additionalInfo}
            </Card.Text>
            <Form onSubmit={handleBookingSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={renterDetails.fullname}
                  onChange={(e) =>
                    setRenterDetails({ ...renterDetails, fullname: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact Information</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your contact details"
                  value={renterDetails.contact}
                  onChange={(e) =>
                    setRenterDetails({ ...renterDetails, contact: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                Submit Booking Request
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );

  const BookingHistoryTab = () => (
    <table className="bookings-table">
      <thead>
        <tr>
          <th>Property ID</th>
          <th>Tenant Name</th>
          <th>Tenant Phone</th>
          <th>Booking Status</th>
        </tr>
      </thead>
      <tbody>
        {bookingData ? (
          <tr>
            <td>{bookingData.propertyId}</td>
            <td>{bookingData.details.tenantName}</td>
            <td>{bookingData.details.tenantContact}</td>
            <td>{bookingData.status}</td>
          </tr>
        ) : (
          <tr>
            <td colSpan="4">No booking history available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div>
      <div className="dashboard-header">
        <h1>Renter Dashboard</h1>
        <div className="renter-greeting">
          <span>Welcome Renter!</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      <div className="tab-header">
        <button
          onClick={() => setActiveTab('allProperties')}
          className={activeTab === 'allProperties' ? 'active' : ''}
        >
          All Properties
        </button>
        <button
          onClick={() => setActiveTab('bookingHistory')}
          className={activeTab === 'bookingHistory' ? 'active' : ''}
        >
          Booking History
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'allProperties' && <PropertyList />}
        {activeTab === 'bookingHistory' && <BookingHistoryTab />}
      </div>
    </div>
  );
};

export default RenterDashboard;
