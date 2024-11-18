import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import renterDashBoard from './routes/renterdashboard.js'
import ownerRoutes from './routes/ownerRoutes.js'
import adminRoutes from './routes/adminRoute.js'


config();

const app = express();
app.use(json());
app.use(cors());

connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes); // Auth routes for login and register
app.use('/api/renter', renterDashBoard); // Renter dashboard routes`
app.use('/api',ownerRoutes);
app.use('/api/admin',adminRoutes);


const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
