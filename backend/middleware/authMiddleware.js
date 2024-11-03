// middleware/authMiddleware.js
import jwt from 'jsonwebtoken'; // Import the JWT library
import User from '../schemas/userModel.js'; // Import the User model

export const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied.' }); // Send JSON response

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set
    req.user = await User.findById(decoded.id); // Use the User model to find by ID
    if (!req.user) return res.status(404).json({ message: 'User not found.' }); // Send JSON response
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' }); // Send JSON response
  }
};

export default authMiddleware;
