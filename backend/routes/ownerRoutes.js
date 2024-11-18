import mongoose from 'mongoose';
import express from 'express'
import Property from '../schemas/PropertyModel.js';
import Booking from '../schemas/bookingModel.js';
import Owner from '../schemas/ownerModel.js';
const router = express.Router();


// Add new property
// Add new property
router.post('/addproperties', async (req, res) => {
    try {
        const { ownerId, propertyType, propertyAdType, propertyAddress, ownerContact, propertyAmt, propertyImage, additionalInfo } = req.body;

        // Validate required fields
        if (!ownerId || !propertyType || !propertyAdType || !propertyAddress || !ownerContact || !propertyAmt) {
            return res.status(400).json({ message: 'All fields except additionalInfo are required.' });
        }

        const property = new Property({ ownerId, propertyType, propertyAdType, propertyAddress, ownerContact, propertyAmt, propertyImage, additionalInfo });

        const savedProperty = await property.save();
        res.status(201).json(savedProperty);
    } catch (err) {
        console.error('Error adding property:', err.message);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});


// Get all properties of the owner
router.get('/properties/:ownerId', async (req, res) => {
    const { ownerId } = req.params; // Use the param ownerId
    try {
        const properties = await Property.find({ ownerId })
            .sort({ createdAt: -1 });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.get('/bookings/:ownerId', async (req, res) => {
    const { ownerId } = req.params; // Get ownerId from URL parameters
    try {
        const properties = await Property.find({ ownerId });
        const propertyIds = properties.map((property) => property._id);
        const bookings = await Booking.find({ propertyId: { $in: propertyIds } });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
router.patch('/api/bookings/:bookingid', async (req, res) => {
    const { bookingid } = req.params;
    const { status } = req.body;
  
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingid,
        { status },
        { new: true }
      );
      if (!updatedBooking) return res.status(404).send('Booking not found');
      res.json(updatedBooking);
    } catch (error) {
      res.status(500).send('Error updating booking: ' + error.message);
    }
  });
  


// Get all booking requests for owner's properties

 export default router