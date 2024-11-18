import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner', // Ensure this matches your Owner model
    required: true,
  },
  propertyType: { type: String, required: true },
  propertyAdType: { type: String, required: true },
  propertyAddress: { type: String, required: true },
  ownerContact: { type: String, required: true },
  propertyAmt: { type: Number, required: true },
  propertyImage: { type: String, required: true },
  additionalInfo: { type: String },
}, { timestamps: true });

const Property = mongoose.models.Property || mongoose.model('Property', PropertySchema);

export default Property;
