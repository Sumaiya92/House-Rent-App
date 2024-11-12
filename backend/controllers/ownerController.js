// controllers/ownerController.js
import Property from "../schemas/propertyModel.js";

// Create Property
export const createProperty = async (req, res) => {
    try {
        const { ownerId, propertyType, propertyAdType, propertyAddress, ownerContact, propertyAmt, ownerName, propertyImage, additionalInfo } = req.body;

        const newProperty = new Property({
            ownerId,
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

// Get All Properties
export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Property by ID
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

// Update Property
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

// Delete Property
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
