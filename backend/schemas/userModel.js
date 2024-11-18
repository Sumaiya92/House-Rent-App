import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to another user
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Renter', 'Owner', 'Admin'], required: true },
  bookingHistory: { type: [Object], default: [] },
  createdAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false },
  phoneNumber: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});


export default mongoose.model('User', userSchema);
