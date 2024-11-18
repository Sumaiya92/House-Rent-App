// schemas/ownerModel.js
import mongoose from 'mongoose';

// Define the owner schema
const ownerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    password: { type: String, required: true }, // Assuming you want to store a password
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }], // Reference to properties owned
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the owner was created
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Status of the owner
});

// Create the Owner model
const Owner = mongoose.model('Owner', ownerSchema);

// Export the Owner model
export default Owner;