// index.js
import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import userRoutes from './routes/userRoute.js';
import ownerRoutes from './routes/ownerRoute.js';
import adminRoutes from './routes/adminRoute.js';

config();

const app = express();

// Middleware to parse JSON
app.use(json());

// Connect to MongoDB
connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/admin', adminRoutes);

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
