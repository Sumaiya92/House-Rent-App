import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Fixed the import of jwtDecode
import { useNavigate } from 'react-router-dom'; // Import useHistory for redirection
import BookingForm from './BookingForm';
import { useUser } from '../components/Context/useContext';

const RenterDashboard = () => {
    const { user } = useUser(); 
    const [activeTab, setActiveTab] = useState('properties');
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [bookingForm, setBookingForm] = useState({
        tenantName: '',
        tenantContact: '',
        bookingDate: '',
        additionalInfo: ''
    });
    const [renterId, setRenterId] = useState(null);
    const [renterName, setRenterName] = useState(''); // State for renter's name
    const navigate = useNavigate(); // Hook for redirection

    // Fetch available properties for the renter
    const fetchData = async () => {
        try {
            const propertiesResponse = await axios.get('http://localhost:8000/api/renter/properties');
            setProperties(propertiesResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch bookings for the renter
    const fetchBookings = async () => {
        try {
            const bookingsResponse = await axios.get('http://localhost:8000/api/renter/booking-history');
            setBookings(bookingsResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    // This useEffect is responsible for fetching the properties and renterId
    useEffect(() => {
        fetchData();
        retrieveRenterId();
    }, []);

    // This useEffect runs when renterId is set, triggering the booking fetch
    useEffect(() => {
        if (renterId) {
            fetchBookings();
        }
    }, [renterId]);

    // Retrieve renterId and renterName from the token stored in localStorage
    const retrieveRenterId = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setRenterId(decodedToken.userId);
            setRenterName(decodedToken.name); // Assuming the token has a 'name' field for the renter's name
        }
    };

    // Handle property booking selection
    const handleBookProperty = (property) => {
        setSelectedProperty(property);
        setShowBookingForm(true);
    };

    // Handle form input changes for booking
    const handleFormChange = (e) => {
        setBookingForm({
            ...bookingForm,
            [e.target.name]: e.target.value
        });
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
      };
    // Handle booking form submission
    const handleSubmitBooking = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/renter/bookings', {
                tenantName: bookingForm.tenantName,
                tenantContact: bookingForm.tenantContact,
                bookingDate: bookingForm.bookingDate,
                additionalInfo: bookingForm.additionalInfo,
                propertyId: selectedProperty._id,
                ownerId: selectedProperty.ownerId,
                renterId: renterId,
            });

            setBookings((prevBookings) => [
                ...prevBookings,
                response.data,
            ]);

            setShowBookingForm(false);
            setSuccessMessage('Booking submitted successfully!');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };



    return (
        <div style={styles.container}>
            {/* Header with renter's name and logout button */}
            <div style={styles.header}>
            <h1>Welcome, {user.name}!</h1>
            <button className="btn btn-outline-light" onClick={handleLogout}>
                    
                        Logout
            </button>
            </div>

            <div style={styles.tabs}>
                <button 
                    style={{
                        ...styles.tabButton,
                        backgroundColor: activeTab === 'properties' ? '#1976d2' : '#e0e0e0',
                        color: activeTab === 'properties' ? 'white' : 'black'
                    }}
                    onClick={() => setActiveTab('properties')}
                >
                    Available Properties
                </button>
                <button 
                    style={{
                        ...styles.tabButton,
                        backgroundColor: activeTab === 'bookings' ? '#1976d2' : '#e0e0e0',
                        color: activeTab === 'bookings' ? 'white' : 'black'
                    }}
                    onClick={() => setActiveTab('bookings')}
                >
                    Booking History
                </button>
            </div>

            {activeTab === 'properties' && (
                <div style={styles.contentContainer}>
                    <h2 style={styles.heading}>Available Properties</h2>
                    <div style={styles.propertiesList}>
                        {properties.map((property) => (
                            <div key={property._id} style={styles.propertyCard}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            >

                                {property.propertyImage && (
                                    <img 
                                        src={property.propertyImage} 
                                        alt="Property" 
                                        style={styles.propertyImage} 
                                    />
                                )}
                                <h3>{property.ownerName} - {property.propertyType}</h3>
                                <p>Address: {property.propertyAddress}</p>
                                <p>Contact: {property.ownerContact}</p>
                                <p>Price: ₹{property.propertyAmt}</p>
                                <button 
                                    onClick={() => handleBookProperty(property)}
                                    style={styles.bookButton}
                                >
                                    Book Property
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'bookings' && (
                <div style={styles.contentContainer}>
                    <h2 style={styles.heading}>Booking History</h2>
                    <div style={styles.bookingsList}>
                        {bookings && bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <div key={booking._id} style={styles.bookingCard}>
                                    <h3>{booking.tenantName}</h3>
                                    <p><strong>Tenant Contact:</strong> {booking.tenantContact}</p>
                                    <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                                    <p><strong>Additional Info:</strong> {booking.additionalInfo}</p>
                                    <p><strong>Status:</strong> {booking.status}</p>
                                    <p><strong>Property ID:</strong> {booking.propertyId}</p>
                                    <p><strong>Owner ID:</strong> {booking.ownerId}</p>
                                </div>
                            ))
                        ) : (
                            <div>No bookings available.</div>
                        )}
                    </div>
                </div>
            )}

            {showBookingForm && (
                <BookingForm 
                    bookingForm={bookingForm}
                    handleFormChange={handleFormChange}
                    handleSubmitBooking={handleSubmitBooking}
                    setShowBookingForm={setShowBookingForm}
                />
            )}

            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        </div>
    );
};

const styles = {
    container: {
        padding: '30px',
        background: '#F8FAFC', // Light blue-gray background
        minHeight: '100vh',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px 30px',
        background: '#1E293B', // Dark blue-gray header
        borderRadius: '12px',
        color: 'white',
        boxShadow: '0 4px 12px rgba(30, 41, 59, 0.1)',
    },
    headerText: {
        fontSize: '28px',
        fontWeight: 'bold',
    },
    logoutButton: {
        background: '#334155', // Slightly lighter than header
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background 0.3s ease',
        '&:hover': {
            background: '#475569', // Lighter on hover
        },
    },
    tabs: {
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
    },
    tabButton: {
        padding: '12px 20px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        background: '#E2E8F0', // Light blue-gray
        color: '#334155', // Darker text
        boxShadow: '0 2px 5px rgba(30, 41, 59, 0.1)',
    },
    activeTabButton: {
        background: '#334155', // Dark blue-gray when active
        color: '#ffffff',
    },
    contentContainer: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 6px 15px rgba(30, 41, 59, 0.1)',
    },
    heading: {
        fontSize: '26px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#1E293B', // Dark blue-gray for headings
    },
    propertiesList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    propertyCard: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(30, 41, 59, 0.08)',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        border: '1px solid #E2E8F0', // Light blue-gray border
    },
    propertyCardHover: {
        transform: 'scale(1.02)',
        boxShadow: '0 6px 25px rgba(30, 41, 59, 0.12)',
    },
    propertyImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '10px',
        marginBottom: '15px',
    },
    bookButton: {
        background: '#334155', // Dark blue-gray
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        marginTop: '10px',
        '&:hover': {
            background: '#475569', // Lighter on hover
        },
    },
    bookingsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    bookingCard: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(30, 41, 59, 0.08)',
        fontSize: '16px',
        border: '1px solid #E2E8F0', // Light blue-gray border
    },
    successMessage: {
        color: '#0F766E', // Teal-gray for success
        fontWeight: 'bold',
        fontSize: '16px',
        marginTop: '20px',
    },
};

// Add hover effect for property cards dynamically
const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = styles.propertyCardHover.transform;
    e.currentTarget.style.boxShadow = styles.propertyCardHover.boxShadow;
};

const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = '';
    e.currentTarget.style.boxShadow = '';
};



export default RenterDashboard;
