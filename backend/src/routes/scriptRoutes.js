import express from "express";
import { getFullBannerTemplateById, generateConsentScript } from "../controllers/scriptController.js";

const router = express.Router();

// Route to fetch full banner template details
router.get("/banner-template/:templateId", getFullBannerTemplateById);

// Route to generate the consent script dynamically
router.get("/generate-script/:templateId", generateConsentScript);

export default router;
