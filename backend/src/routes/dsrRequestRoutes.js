import express from "express";
import dsrRequestController from "../controllers/dsrRequestController.js";

const router = express.Router();

// Create a new DSR request
router.post("/create", dsrRequestController.createDSRRequest);

// Get all DSR requests (with email and username)
router.get("/getall", dsrRequestController.getAllDSRRequests);

// Get a specific DSR request by ID
router.get("/get/:id", dsrRequestController.getDSRRequestById);

// Get DSR request details for customer support by ID (with hardcoded user details)
router.get("/support/get/:id", dsrRequestController.getDSRRequestForSupportById);


// Get all DSR requests for customer support
router.get("/support/getall", dsrRequestController.getAllDSRRequestsForSupport);


export default router;
