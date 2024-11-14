import mongoose from 'mongoose';
import Booking from '../schemas/bookingModel.js';
import Property from '../schemas/propertyModel.js';

export const createProperty = async (req, res) => {
  try {
    const { ownerId, propertyType, propertyAdType, propertyAddress, ownerContact, propertyAmt, ownerName, propertyImage, additionalInfo } = req.body;

    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ message: 'Invalid ownerId format' });
    }

    const newProperty = new Property({
      ownerId: mongoose.Types.ObjectId(ownerId),
      propertyType,
      propertyAdType,
      propertyAddress,
      ownerContact,
      propertyAmt,
      ownerName,
      propertyImage,
      additionalInfo
    });

    await newProperty.save();
    res.status(201).json({ message: 'Property created successfully', property: newProperty });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPropertiesByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ message: 'Invalid ownerId format' });
    }

    const properties = await Property.find({ ownerId: mongoose.Types.ObjectId(ownerId) });

    if (properties.length === 0) {
      return res.status(404).json({ message: 'No properties found for this owner' });
    }

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);

    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// In your controller file (e.g., controllers.js)
export const getBookingsByOwner = async (req, res) => {
  const ownerId = req.params.ownerId;
  try {
    // Fetch bookings from the database based on ownerId
    const bookings = await Booking.find({ ownerId: ownerId });
    if (!bookings) {
      return res.status(404).json({ message: 'No bookings found for this owner.' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const fetchOwnerDetails = async (req, res) => {
    const { ownerId } = req.params; // Assuming you're passing ownerId as a parameter

    try {
        const owner = await Owner.findById(ownerId).select('-password'); // Exclude password for security

        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }

        res.status(200).json(owner);
    } catch (error) {
        console.error('Error fetching owner details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};