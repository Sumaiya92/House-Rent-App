import express from 'express';
import { createProperty, getPropertiesByOwner, getPropertyById, updateProperty, deleteProperty, getAllProperties,getBookingsByOwner} from '../controllers/ownerController.js';
import authenticate from '../middleware/authMiddleware.js';
import Property from '../schemas/propertyModel.js';

const router = express.Router();

// Get all properties
router.get('/properties', authenticate, getAllProperties);

// Create a new property
router.post('/properties', authenticate, createProperty);

// Get properties by owner
router.get('/properties/:ownerId', authenticate, getPropertiesByOwner);

// Get property by ID
router.get('/properties/:id', authenticate, getPropertyById);

// Update a property
router.put('/properties/:id', authenticate, updateProperty);

// Delete a property
router.delete('/properties/:id', authenticate, deleteProperty);

router.get("/fetch-owner/:propertyId", async (req, res) => {
  try {
      const { propertyId } = req.params;

      // Find property by ID and populate owner details
      const property = await Property.findById(propertyId).populate("ownerId", "name contact");

      if (!property) {
          return res.status(404).json({ message: "Property not found" });
      }

      const ownerDetails = {
          ownerName: property.ownerId.name,
          contact: property.ownerId.contact,
      };

      res.json(ownerDetails);
  } catch (error) {
      console.error("Error fetching owner details:", error);
      res.status(500).json({ message: "Server error" });
  }
});
router.get('/owner/bookings/:ownerId', authenticate, getBookingsByOwner);

// router.post('/fetch-owner-details', async (req, res) => {
//     try {
//       const { propertyId } = req.body; // Submitted property ID
  
//       // Fetch the property using the property ID
//       const property = await Property.findById(propertyId);
  
//       if (!property) {
//         return res.status(404).json({ message: 'Property not found' });
//       }
  
//       // Fetch the owner details using the ownerId from the property
//       const owner = await Owner.findById(property.ownerId);
  
//       if (!owner) {
//         return res.status(404).json({ message: 'Owner not found' });
//       }
  
//       // Return the owner name and contact details
//       res.json({
//         ownerName: owner.name,
//         ownerContact: owner.contact,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
export default router;
