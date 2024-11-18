import express from "express";
import { createBooking, getBookingHistory, getAllProperties } from "../controllers/bookingController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/properties", getAllProperties);
router.get("/bookings/history", isAuthenticated, getBookingHistory);
router.post("/bookings", isAuthenticated, createBooking);

export default router;
