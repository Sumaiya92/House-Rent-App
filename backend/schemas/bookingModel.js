import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  renterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  details: {
    tenantName: String,
    tenantContact: String,
    bookingDate: Date,
    additionalInfo: String
  },
  status: {
    type: String,
    enum: ['Pending Approval', 'Approved', 'Rejected', 'Cancelled'],
    default: 'Pending Approval'
  }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);