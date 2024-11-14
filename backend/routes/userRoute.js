import express from "express";
import mongoose from "mongoose";
import User from "../schemas/userModel.js";
import Property from "../schemas/propertyModel.js";
import Booking from "../schemas/bookingModel.js";

const router = express.Router();

// POST route to handle booking
router.post("/book", async (req, res) => {
  try {
    const { propertyId, renterId, bookingDetails } = req.body;

    // Debugging: log the incoming propertyId and renterId
    console.log('Received propertyId:', propertyId);
    console.log('Received renterId:', renterId);

    // Validate propertyId and renterId as ObjectId
    if (!mongoose.Types.ObjectId.isValid(propertyId) || !mongoose.Types.ObjectId.isValid(renterId)) {
      return res.status(400).json({ message: "Invalid property or renter ID" });
    }

    // Fetch property and user from the database
    const property = await Property.findById(propertyId);
    const user = await User.findById(renterId);
    
    // Debugging: log the fetched property and user
    console.log('Fetched Property:', property);
    console.log('Fetched User:', user);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }

    // Create the booking
    const booking = {
      propertyId,
      renterId,
      details: bookingDetails,
      status: "Pending Approval",
    };

    // Add booking to user's booking history
    user.bookingHistory.push(booking);
    await user.save();

    return res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});
// GET route to fetch booking history
router.get("/get-booking-history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user.bookingHistory);
  } catch (error) {
    console.error("Error fetching booking history:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET route to fetch specific user details
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET route to fetch all bookings for a specific user
router.get('/bookings/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const bookings = await Booking.find({ renterId: userId })
      .populate('propertyId', 'propertyAddress propertyAmt ownerName ownerContact')
      .exec();

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
