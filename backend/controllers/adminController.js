// Import the necessary models

import Property from '../schemas/propertyModel.js';
import User from '../schemas/userModel.js';
import mongoose from 'mongoose';

// Function to retrieve all owners (users with role "Owner")
export const getAllOwners = async (req, res) => {
    try {
        const owners = await User.find({ role: 'Owner' }).select('-password -bookingHistory'); // Exclude sensitive data
        res.json({ owners });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch owners' });
    }
};

// Function to retrieve all properties
export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json({ properties });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch properties' });
    }
};

// Function to retrieve all renters (users with role "Renter")
// Function to retrieve all renters (users with role "Renter")
export const getAllRenters = async (req, res) => {
    try {
        // Ensure we explicitly exclude bookingHistory and password
        const renters = await User.find({ role: 'Renter' }).select('-password -bookingHistory');
        
        // Check if the data is being filtered properly
        console.log(renters);

        res.json({ renters });
    } catch (error) {
        console.error(error); // Log any error for debugging
        res.status(500).json({ message: 'Failed to fetch renters' });
    }
};


// Function for admin action to approve/reject owner applications  // Assuming the model is imported

// adminController.js or similar
export const ownerAction = async (req, res) => {
    const { ownerId, action } = req.body;

    try {
        const owner = await User.findById(ownerId);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }

        // Update the owner status
        owner.status = action === 'approve' ? 'approved' : 'rejected';
        await owner.save();

        res.json({ 
            message: `Owner successfully ${action}d`,
            owner: {
                _id: owner._id,
                name: owner.name,
                email: owner.email,
                status: owner.status,
                role: owner.role
            }
        });
    } catch (err) {
        console.error('Owner action error:', err);
        res.status(500).json({ message: 'Failed to process action' });
    }
};
