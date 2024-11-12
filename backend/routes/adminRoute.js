import express from 'express';
import { approveOwner ,getAllUsers} from '../controllers/adminController.js';

const router = express.Router();

// Route to approve an owner
router.put('/approve/:ownerId', approveOwner);

// Uncomment if getAllUsers is required for testing/admin purposes
router.get('/all-owners', getAllUsers);

export default router;
