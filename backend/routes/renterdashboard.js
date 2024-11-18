// routes/renterdashboard.js
import express from 'express';
import Property from '../schemas/PropertyModel.js';
import Booking from '../schemas/bookingModel.js';

const router = express.Router();

// Get all properties for the renter
router.get('/properties', async (req, res) => {
  console.log("Fetching properties...");
  try {
    const properties = await Property.find({});
    res.status(200).json(properties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get the renter's booking history
router.get('/bookings', async (req, res) => {
  try {
    const renterId = req.userId; // Ensure userId is set via middleware or token decoding
    console.log(renterId);
    const bookings = await Booking.find({ renterId }).populate('propertyId');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new booking
// Create a new booking
router.post('/bookings', async (req, res) => {
  try {
    const { renterId, propertyId, ownerId, tenantName, tenantContact, bookingDate, additionalInfo } = req.body;

    // Validate the booking data
    if (!renterId || !propertyId || !ownerId || !tenantName || !tenantContact || !bookingDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = new Booking({
      renterId,
      propertyId,
      ownerId, // Now ownerId is properly passed to the model
      tenantName,
      tenantContact,
      bookingDate,
      additionalInfo,
      status: 'Pending' // default status
    });
    const savedBooking = await newBooking.save();

    res.status(201).json(savedBooking); // Respond with the saved booking

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get detailed booking history
router.get('/booking-history', async (req, res) => {
  try {
    const renterId = req.userId; // Ensure userId is set via middleware or token decoding
    const bookings = await Booking.find({ renterId }).populate("propertyId");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
