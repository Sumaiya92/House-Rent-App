  import mongoose from 'mongoose';

  // Define the user schema
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['renter', 'owner', 'admin'], // Define the allowed roles
      default: 'renter', // Set default role to 'user'
      required: true 
    },
  }, { timestamps: true });

  // Create the User model
  const User = mongoose.model('User', userSchema);

  // Export the model as default
  export default User;

  // Additional functions for user operations
  export const createUser = (data) => User.create(data); // Function to create a new user
  export const findUser = (query) => User.findOne(query); // Function to find a user
