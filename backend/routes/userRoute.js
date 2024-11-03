// routes/userRoutes.js
import express from 'express';
import { getAllUsers, registerUser, loginUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// User registration and login routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// User management routes
router.get('/', getAllUsers);
// router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
