import express from "express";
import User from "../schemas/userModel.js"; // Assuming you have a User model
import Property from "../schemas/propertyModel.js"; // Assuming Property model is there

const router = express.Router();

// POST route to handle booking
router.post("/book-property", async (req, res) => {
  try {
    const { propertyId, renterId, bookingDetails } = req.body;

    const property = await Property.findById(propertyId);
    const user = await User.findById(renterId);

    if (!property || !user) {
      return res.status(400).json({ message: "Property or User not found" });
    }

    // Create the booking in the database
    const booking = {
      propertyId,
      renterId,
      details: bookingDetails,
      status: "Pending Approval",
    };

    // Save to booking history or database
    user.bookingHistory.push(booking);
    await user.save();

    return res.status(200).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET route to fetch booking history
router.get("/get-booking-history/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.status(200).json(user.bookingHistory);
  } catch (error) {
    console.error("Error fetching booking history:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
