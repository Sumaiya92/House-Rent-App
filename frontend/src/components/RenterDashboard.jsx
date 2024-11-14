import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Container, Row, Col, Modal, Form } from "react-bootstrap";
import { FaBed, FaMoneyBillAlt, FaInfoCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import './renter.css';

const RenterDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('allProperties');
  const [renterDetails, setRenterDetails] = useState(() => {
    const savedDetails = localStorage.getItem('renterDetails');
    return savedDetails ? JSON.parse(savedDetails) : { fullname: "", contact: "" };
  });
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [ownerDetails, setOwnerDetails] = useState({});

  // Fetch owner details for a specific property ID
  const fetchOwnerDetails = async (propertyId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/owners/fetch-owner/${propertyId}`,  // Updated to match backend route
        { headers: { Authorization: `Bearer ${token}` }}
      );
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error fetching owner details:", error);
      return {};
    }
  };

  // Fetch properties and their owner details
  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8001/api/owners/properties", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProperties(response.data);

        // Fetch owner details for each property
        const ownerDetailsPromises = response.data.map(async (property) => {
          const owner = await fetchOwnerDetails(property._id, token);
          return { [property._id]: owner };
        });
        const fetchedOwnerDetails = await Promise.all(ownerDetailsPromises);
        setOwnerDetails(Object.assign({}, ...fetchedOwnerDetails));
        //
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
        setBookingStatus("Failed to load properties. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [navigate]);

  // Fetch user's bookings and related owner details
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
  
      try {
        const decodedToken = jwtDecode(token);
        const response = await axios.get(
          `http://localhost:8001/api/users/bookings/${decodedToken.userId}`,
          { headers: { Authorization: `Bearer ${token}` }}
        );
        setBookings(response.data.bookings);
        // console.log(bookings)
        // Fetch owner name and contact for each booking using the propertyId
        const ownerDetailsPromises = response.data.bookings.map(async (booking) => {
          const ownerResponse = await axios.get(
            `http://localhost:8001/api/owners/fetch-owner/${booking.propertyId._id}`,
            { headers: { Authorization: `Bearer ${token}` }}
          );
          return { [booking.propertyId._id]: ownerResponse.data };
        });
        const ownerDetailsArray = await Promise.all(ownerDetailsPromises);
        const ownerDetailsMap = Object.assign({}, ...ownerDetailsArray);
        
        // Update owner details in the state
        setOwnerDetails((prev) => ({
          ...prev,
          ...ownerDetailsMap,
        }));
      } catch (error) {
        console.error("Error fetching bookings:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };
  
    if (activeTab === 'bookingHistory') {
      fetchBookings();
    }
  }, [activeTab, navigate]);

  // Save renter details to localStorage when they change
  useEffect(() => {
    localStorage.setItem('renterDetails', JSON.stringify(renterDetails));
  }, [renterDetails]);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
    setBookingStatus("");
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setIsLoading(true);
      const decodedToken = jwtDecode(token);
      const bookingData = {
        propertyId: selectedProperty._id,
        renterId: decodedToken.userId,
        bookingDetails: {
          tenantName: renterDetails.fullname,
          tenantContact: renterDetails.contact,
          bookingDate: new Date(),
          additionalInfo: ""
        }
      };

      await axios.post(
        "http://localhost:8001/api/book-property",
        bookingData,
        { headers: { Authorization: `Bearer ${token}` }}
      );

      setBookingStatus("Your booking is now pending approval.");
      setShowModal(false);
      
      // Refresh bookings if we're on the booking history tab
      if (activeTab === 'bookingHistory') {
        const response = await axios.get(
          `http://localhost:8001/api/bookings/${decodedToken.userId}`,
          { headers: { Authorization: `Bearer ${token}` }}
        );
        setBookings(response.data.bookings);
      }
    } catch (error) {
      setBookingStatus("Failed to submit booking. Please try again.");
      console.error("Booking error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    localStorage.removeItem("bookingData");
    localStorage.removeItem("renterDetails");
    navigate("/login");
  };

  const PropertyCard = ({ property }) => {
    const owner = ownerDetails[property._id] || {};
    return (
      <Card className="shadow-sm rounded border-light h-100">
        <Card.Img
          variant="top"
          src={property.propertyImage || "https://via.placeholder.com/150"}
          alt={property.propertyAddress}
          className="card-img-top"
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate" title={property.propertyAddress}>
            {property.propertyAddress}
          </Card.Title>
          <Card.Text>
            <div className="d-flex align-items-center mb-2">
              <FaMoneyBillAlt className="me-2" /> ${property.propertyAmt}
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaBed className="me-2" /> {property.propertyType}
            </div>
            {owner && (
              <div>
                <strong>Owner: </strong>{property.ownerName}<br />
                <strong>Contact: </strong>{property.ownerContact || 'N/A'}
              </div>
            )}
          </Card.Text>
          <Button
            variant="outline-primary"
            onClick={() => handlePropertyClick(property)}
            className="mt-auto w-100"
          >
            <FaInfoCircle className="me-2" /> Get Info
          </Button>
        </Card.Body>
      </Card>
    );
  };

  const PropertyList = () => (
    <Container>
      <h1 className="text-center my-4">Available Properties</h1>
      {isLoading ? (
        <div className="text-center">Loading properties...</div>
      ) : (
        <Row className="g-4">
          {properties.length > 0 ? (
            properties.map((property) => (
              <Col key={property._id} lg={4} md={6} className="mb-4">
                <PropertyCard property={property} />
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <p>No properties available at the moment.</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
  

  const BookingHistoryTab = () => (
        <div className="table-responsive">
            <h2 className="text-center my-4">Booking History</h2>
            <table className="bookings-table">
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Property Address</th>
                        <th>Owner Name</th>
                        <th>Owner Contact</th>
                        <th>Monthly Rent</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => {
                            if (!booking || !booking.propertyId) return null; // Check for null values
                            return (
                                <tr key={booking._id}>
                                    <td>{booking._id}</td>
                                    <td>{booking.propertyId.propertyAddress}</td>
                                    <td>{booking.propertyId.ownerName}</td>
                                    <td>{booking.propertyId.ownerContact}</td>
                                    <td>{booking.propertyId.propertyAmt}</td>
                                    <td>{booking.status || "Pending"}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="6">No bookings found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
)
  

  return (
    <div className="renter-dashboard">
      <header className="d-flex justify-content-between align-items-center p-3 bg-primary text-white">
        <h3>Renter Dashboard</h3>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </header>
      
      <div className="tabs my-4 text-center">
        <Button variant={activeTab === 'allProperties' ? "primary" : "outline-primary"} onClick={() => setActiveTab('allProperties')}>
          All Properties
        </Button>
        <Button variant={activeTab === 'bookingHistory' ? "primary" : "outline-primary"} onClick={() => setActiveTab('bookingHistory')}>
          My Bookings
        </Button>
      </div>

      {activeTab === 'allProperties' ? <PropertyList /> : <BookingHistoryTab />}

      {/* Modal for Property Info */}
      {selectedProperty && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProperty.propertyAddress}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {bookingStatus && <div className="alert alert-info">{bookingStatus}</div>}
            <Form onSubmit={handleBookingSubmit}>
              <Form.Group controlId="renterName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
                  value={renterDetails.fullname}
                  onChange={(e) => setRenterDetails({ ...renterDetails, fullname: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="renterContact">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter contact number"
                  value={renterDetails.contact}
                  onChange={(e) => setRenterDetails({ ...renterDetails, contact: e.target.value })}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Booking'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default RenterDashboard;
