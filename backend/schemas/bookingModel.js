import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({    
propertyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Property' },
    renterId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    tenantName: { type: String, required: true },
    tenantContact: { type: String, required: true },
    bookingDate: { type: Date, required: true },
    additionalInfo: { type: String },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;