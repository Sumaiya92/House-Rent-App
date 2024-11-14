import express from 'express';
import {getPropertyDetails} from '../controllers/propertyController.js';
const router = express.Router();

router.get('/:id',getPropertyDetails);
export default router;