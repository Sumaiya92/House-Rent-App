import express from 'express';
import { getAllOwners, getAllProperties, getAllRenters, ownerAction } from '../controllers/adminController.js';

const router = express.Router();

router.get('/all-owners', getAllOwners); // Directly use the function, it handles req and res

router.get('/all-properties', getAllProperties); // Same here

router.get('/all-renters', getAllRenters); // Same here

router.post('/owner-action', ownerAction); // Same here

export default router;
