import express from "express";
import myConsentController from "../controllers/myConsentController.js";

const router = express.Router();

// Route to get all user consent details in a single response
router.get("/all/:userId", myConsentController.getAllConsentDetails);

export default router;