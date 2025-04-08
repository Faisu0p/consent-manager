import express from "express";
import dsrRequestController from "../controllers/dsrRequestController.js";

const router = express.Router();

// Create a new DSR request
router.post("/create", dsrRequestController.createDSRRequest);

// Get all DSR requests (with email and username)
router.get("/getall", dsrRequestController.getAllDSRRequests);

// Get a specific DSR request by ID
router.get("/get/:id", dsrRequestController.getDSRRequestById);

export default router;
