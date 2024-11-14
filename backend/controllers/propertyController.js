// controllers/propertyController.js
import Property  from '../schemas/propertyModel.js';

export async function getPropertyDetails(req, res) {
    try {
        const propertyDetails = await findById(req.params.id);
        res.status(200).json(propertyDetails);
    } catch (error) {
        console.error('Error fetching property details:', error);
        res.status(500).json({ message: 'Error fetching property details' });
    }
}
