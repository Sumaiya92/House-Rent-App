// import Property from '../schemas/propertyModel.js'; // Adjust according to your actual schema file

// // Add Property
// export const addProperty = async (req, res) => {
//     try {
//         const newProperty = new Property(req.body);
//         await newProperty.save();
//         res.status(201).json({ message: 'Property created successfully', newProperty });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Get All Properties
// export const getProperties = async (req, res) => {
//     try {
//         const properties = await Property.find();
//         res.status(200).json(properties);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Get Property By ID
// export const getPropertyById = async (req, res) => {
//     try {
//         const { id } = req.params; // Ensure this matches the route parameter
//         const property = await Property.findById(id);
//         if (!property) return res.status(404).json({ message: 'Property not found' });
//         res.status(200).json(property);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Update Property
// export const updateProperty = async (req, res) => {
//     try {
//         const { id } = req.params; // Ensure this matches the route parameter
//         const updatedProperty = await Property.findByIdAndUpdate(id, req.body, { new: true });
//         if (!updatedProperty) return res.status(404).json({ message: 'Property not found' });
//         res.status(200).json({ message: 'Property updated successfully', updatedProperty });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Delete Property
// export const deleteProperty = async (req, res) => {
//     try {
//         const { id } = req.params; // Ensure this matches the route parameter
//         const deletedProperty = await Property.findByIdAndDelete(id);
//         if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
//         res.status(204).send(); // No content to send back after deletion
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
import Property from '../schemas/propertyModel.js';

// Add Property
export const addProperty = async (req, res) => {
    try {
        const newProperty = new Property(req.body);
        await newProperty.save();
        res.status(201).json({ message: 'Property created successfully', newProperty });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Properties
export const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json({ message: 'Properties fetched successfully', properties });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Property By ID
export const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.status(200).json({ message: 'Property fetched successfully', property });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update Property
// Update Property
// Update Property
export const updateProperty = async (req, res) => {
    try {
        const { id } = req.params; // Get the property ID from the request parameters
        const updatedProperty = await Property.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        // Check if the property was found and updated
        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Return the updated property data
        res.status(200).json({ message: 'Property updated successfully', updatedProperty });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Delete Property
export const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProperty = await Property.findByIdAndDelete(id);
        if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
