// routes/ownerRoutes.js
import { Router } from 'express';
const router = Router();
import { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty } from '../controllers/ownerController.js';

router.post('/properties', createProperty);
router.get('/properties', getAllProperties);
router.get('/properties/:id', getPropertyById);
router.put('/properties/:id', updateProperty);
router.delete('/properties/:id', deleteProperty);

export default router;
