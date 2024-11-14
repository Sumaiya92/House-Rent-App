import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import userRoutes from './routes/userRoute.js';
import ownerRoutes from './routes/ownerRoute.js';
import adminRoutes from './routes/adminRoute.js';
import propertyRoutes from './routes/propertyRoute.js'
import Booking from './schemas/bookingModel.js';
import Property from './schemas/propertyModel.js';
import User from './schemas/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authenticate from './middleware/authMiddleware.js';

config();

const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only this origin
}));

// Middleware to parse JSON
app.use(json());

// Suppress Mongoose strictQuery warning
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/properties', propertyRoutes);

// Registration Route
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: 'User  registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Profile Route to check if owner is approved
app.get('/api/profile', authenticate, async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Book Property Route
app.post("/api/book-property", async (req, res) => {
  try {
    console.log("Received data in backend:", req.body); // Log received data
    const { propertyId, renterId, bookingDetails } = req.body;

    const newBooking = new Booking({
      propertyId,
      renterId,
      details: bookingDetails,
      status: "Pending Approval"  // Updated status to a valid enum value
    });

    await newBooking.save();

    const property = await Property.findById(propertyId);
    if (property) {
      property.status = "Booked";
      await property.save();
    }

    res.status(200).json({ booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking", error });
  }
});



// Get user's bookings
app.get("/api/bookings/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID " });
    }

    const bookings = await Booking.find({ renterId: userId })
      .populate('propertyId', 'propertyAddress propertyAmt')
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});