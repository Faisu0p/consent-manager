import express from "express";
import { body } from "express-validator";
// import authMiddleware from "../middleware/authMiddleware.js"; // Commented out for testing
import bannerTemplateController from "../controllers/bannerTemplateController.js";

const router = express.Router();

// Create Banner Template Route (Only Admins can access)
router.post(
    "/create",
    [
        body("name").notEmpty().withMessage("Banner name is required"),
        body("mainText").notEmpty().withMessage("Main text is required"),
        body("infoParagraph").notEmpty().withMessage("Info paragraph is required"),
        body("headerText").notEmpty().withMessage("Header text is required"),
        body("buttonAcceptText").notEmpty().withMessage("Accept button text is required"),
        body("buttonRejectText").notEmpty().withMessage("Reject button text is required"),
        body("buttonConfigureText").notEmpty().withMessage("Configure button text is required")
    ],
    // authMiddleware(["Admin"]), // Commented out for testing
    bannerTemplateController.createBannerTemplate
);

// Create Consent Category Route (Only Admins can access)
router.post(
    "/consent-category/create",
    [
        body("templateId").isInt().withMessage("Template ID is required"),
        body("name").notEmpty().withMessage("Category name is required"),
        body("description").notEmpty().withMessage("Category description is required"),
        body("isRequired").isBoolean().withMessage("isRequired must be a boolean value")
    ],
    // authMiddleware(["Admin"]), // Commented out for testing
    bannerTemplateController.createConsentCategory
);

// Create Consent Subcategory Route (Only Admins can access)
router.post(
    "/consent-subcategory/create",
    [
        body("categoryId").isInt().withMessage("Category ID is required"),
        body("name").notEmpty().withMessage("Subcategory name is required"),
        body("description").notEmpty().withMessage("Subcategory description is required")
    ],
    // authMiddleware(["Admin"]), // Commented out for testing
    bannerTemplateController.createConsentSubcategory
);

// Create Partner Route (Only Admins can access)
router.post(
    "/partner/create",
    [
        body("templateId").isInt().withMessage("Template ID is required"),
        body("name").notEmpty().withMessage("Partner name is required"),
        body("isBlocked").isBoolean().withMessage("isBlocked must be a boolean value")
    ],
    // authMiddleware(["Admin"]), // Commented out for testing
    bannerTemplateController.createPartner
);

// Get All Banner Templates (Accessible to all authenticated users)
router.get(
    "/all-templates", 
    // authMiddleware(), // Commented out for testing
    bannerTemplateController.getAllBannerTemplates
);

// Get All Consent Categories for a Template (Accessible to all authenticated users)
router.get(
    "/consent-categories/:templateId", 
    // authMiddleware(), // Commented out for testing
    bannerTemplateController.getConsentCategories
);

// Get All Consent Subcategories for a Category (Accessible to all authenticated users)
router.get(
    "/consent-subcategories/:categoryId", 
    // authMiddleware(), // Commented out for testing
    bannerTemplateController.getConsentSubcategories
);

// Get All Partners for a Template (Accessible to all authenticated users)
router.get(
    "/partners/:templateId", 
    // authMiddleware(), // Commented out for testing
    bannerTemplateController.getPartners
);

export default router;
