import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Property', // Reference to Property model
    required: true,
  },
  renterId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to User model (renter)
    required: true,
  },
  bookingDetails: {
    tenantName: { type: String, required: true },
    tenantContact: { type: String, required: true },
    bookingDate: { type: Date, required: true },
    additionalInfo: { type: String, default: '' },
  },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
