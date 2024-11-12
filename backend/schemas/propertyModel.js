  // schemas/propertyModel.js
  import mongoose from 'mongoose';

  const propertySchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    propertyType: { type: String, required: true },
    propertyAdType: { type: String, required: true },
    propertyAddress: { type: String, required: true },
    ownerContact: { type: String, required: true },
    propertyAmt: { type: Number, required: true },
    ownerName: { type: String, required: true },
    propertyImage: { type: String, required: true },
    additionalInfo: { type: String },
  }, { timestamps: true });

  const Property = mongoose.model('Property', propertySchema);

  export default Property; // Ensure default export
