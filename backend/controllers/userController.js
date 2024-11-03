    // controllers/userController.js
    import User from '../schemas/userModel.js';
    import bcrypt from 'bcrypt';
    import jwt from 'jsonwebtoken';

    // Create a new user function
    export async function createUser(req, res) {
        const { name, email, password } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: 'User created successfully', user: { email: newUser.email, _id: newUser._id } });
        } catch (error) {
            console.error("Error details:", error);
            res.status(400).json({ message: 'Error creating user', error });
        }
    }

    // Register user function
    // controllers/userController.js

    // Register user function
    export async function registerUser(req, res) {
        const { name, email, password, role = 'renter' } = req.body; // Default role to 'renter'

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({ name, email, password: hashedPassword, role });
            await newUser.save();

            // Respond with success message
            res.status(201).json({ message: 'User registered successfully', user: { email: newUser.email, _id: newUser._id, role: newUser.role } });
        } catch (error) {
            console.error("Error details:", error); // Log the full error details for debugging
            res.status(500).json({ message: 'Error registering user', error: error.message || 'Unknown error' });
        }
    }


    // Login user function
    export async function loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(400).json({ message: 'Error logging in', error });
        }
    }

    // Get all users function
    export async function getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching users', error });
        }
    }

    // Get user by ID function
    export async function getUser(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching user', error });
        }
    }

    // Update user function
    export async function updateUser(req, res) {
        const { userId } = req.params;
        const updates = req.body;

        try {
            const user = await User.findByIdAndUpdate(userId, updates, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
            res.status(400).json({ message: 'Error updating user', error });
        }
    }

    // Delete user function
    export async function deleteUser(req, res) {
        const { userId } = req.params;

        try {
            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Error deleting user', error });
        }
    }
