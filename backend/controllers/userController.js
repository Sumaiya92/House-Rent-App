// import User from '../schemas/userModel.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Booking from '../schemas/bookingModel.js'
// import Property from '../schemas/propertyModel.js'

// // Register a new use
// // export async function registerUser(req, res) {
// //   const { name, email, password, role } = req.body;

// //   try {
// //     // Check if the user already exists
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'User already exists' });
// //     }

// //     // Hash the password
// //     const salt = await bcrypt.genSalt(10); // Adjust salt rounds if needed
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     // Create new user with hashed password
// //     const newUser = new User({ name, email, password: hashedPassword, role });
// //     await newUser.save();

// //     res.status(201).json({ message: 'User registered successfully' });
// //   } catch (error) {
// //     console.error('Registration error:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // }


// // // Login user
// // export async function loginUser(req, res) {
// //   const { email, password } = req.body;

// //   // Check if username and password are provided
// //   if (!email || !password) {
// //       return res.status(400).json({ message: 'Email and password are required' });
// //   }

// //   try {
// //       const user = await User.findOne({ email });
// //       if (!user) {
// //           return res.status(400).json({ message: 'Invalid email or password' });
// //       }

// //       const isMatch = await bcrypt.compare(password, user.password);
// //       if (!isMatch) {
// //           return res.status(400).json({ message: 'Invalid email or password' });
// //       }

// //       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
// //       res.json({ token });
// //   } catch (error) {
// //       console.error(error);  // Log the error for debugging purposes
// //       res.status(500).json({ message: 'Error logging in' });
// //   }
// // }
// // Renter - View All Properties
// export async function getProperties(req, res) {
//   try {
//     const properties = await Property.find({ available: true }); // Get available properties
//     res.status(200).json(properties);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching properties');
//   }
// }

// // Renter - Book a Property
// // export async function bookProperty(req, res) {
// //   const { propertyId, renterId, bookingDetails } = req.body;

// //   // Check if renterId is passed correctly
// //   if(!renterId) {
// //     return res.status(400).send('Renter ID is required');
// //   }

// //   try {
// //     const property = await Property.findById(propertyId);
// //     if (!property) {
// //       return res.status(404).send('Property not found');
// //     }

// //     const booking = new Booking({
// //       propertyId,
// //       renterId,
// //       bookingDetails,
// //     });

// //     await booking.save();
// //     res.status(200).send("Booking submitted successfully");
// //   } catch (err) {
// //     console.error("Error booking property:", err);
// //     res.status(500).send("Server error");
// //   }
// // }
