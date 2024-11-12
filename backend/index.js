import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import userRoutes from './routes/userRoute.js';
import ownerRoutes from './routes/ownerRoute.js';
import adminRoutes from './routes/adminRoute.js';
import mongoose from 'mongoose';
import User from './schemas/userModel.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

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
connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/admin', adminRoutes);

// Registration Route
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully' });
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
