import { Router } from 'express';
import { addProperty, getProperties, getPropertyById, updateProperty, deleteProperty } from '../controllers/ownerController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/properties', authMiddleware, addProperty);
router.get('/properties', authMiddleware, getProperties);
router.get('/properties/:id', authMiddleware, getPropertyById); // Add route to get property by ID
router.put('/properties/:id', authMiddleware, updateProperty);
router.delete('/properties/:id', authMiddleware, deleteProperty);

export default router;
