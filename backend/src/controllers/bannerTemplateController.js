import bannerTemplateModel from "../models/bannerTemplateModel.js";
import { validationResult } from "express-validator";

const bannerTemplateController = {


    // Create a new banner template along with related data
    // async createFullBannerTemplate(req, res) {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }

    //     const { 
    //         template, 
    //         portal, 
    //         categories, 
    //         subcategories, 
    //         partners 
    //     } = req.body;

    //     try {
    //         const templateId = await bannerTemplateModel.createBannerTemplate(
    //             template.name, 
    //             template.mainText, 
    //             template.infoParagraph, 
    //             template.headerText, 
    //             template.buttonAcceptText, 
    //             template.buttonRejectText, 
    //             template.buttonConfigureText
    //         );

    //         if (portal) {
    //             await bannerTemplateModel.createConsentPortal(
    //                 templateId, 
    //                 portal.upper_text, 
    //                 portal.lower_text
    //             );
    //         }

    //         for (const category of categories) {
    //             const categoryId = await bannerTemplateModel.createConsentCategory(
    //                 templateId, 
    //                 category.name, 
    //                 category.description, 
    //                 category.is_required
    //             );

    //             if (category.subcategories) {
    //                 for (const subcategory of category.subcategories) {
    //                     await bannerTemplateModel.createConsentSubcategory(
    //                         categoryId, 
    //                         subcategory.name, 
    //                         subcategory.description
    //                     );
    //                 }
    //             }
    //         }

    //         for (const partner of partners) {
    //             await bannerTemplateModel.createPartner(
    //                 templateId, 
    //                 partner.name, 
    //                 partner.is_blocked
    //             );
    //         }

    //         res.status(201).json({ message: "Banner template and related data created successfully", templateId });
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).json({ error: "Server error" });
    //     }
    // },


    // Create a new banner template along with related data
async createFullBannerTemplate(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { template, portal, categories, subcategories, partners } = req.body;

    try {
        // Step 1: Create the banner template and get its database ID
        const templateId = await bannerTemplateModel.createBannerTemplate(
            template.name,
            template.mainText,
            template.infoParagraph,
            template.headerText,
            template.buttonAcceptText,
            template.buttonRejectText,
            template.buttonConfigureText
        );

        // Step 2: Create the consent portal (if exists)
        if (portal) {
            await bannerTemplateModel.createConsentPortal(
                templateId,
                portal.upper_text,
                portal.lower_text
            );
        }

        // Step 3: Store mapping of old category IDs (from frontend) to new DB-generated IDs
        const categoryIdMap = {};

        // Step 4: Insert categories and store their new IDs
        for (const category of categories) {
            const categoryId = await bannerTemplateModel.createConsentCategory(
                templateId,
                category.name,
                category.description,
                category.isRequired // Ensure correct boolean field name
            );

            // Map old category ID (frontend-generated) to new categoryId
            categoryIdMap[category.id] = categoryId;
        }

        // Step 5: Insert subcategories and link them to the correct categoryId
        for (const subcategory of subcategories) {
            const correctCategoryId = categoryIdMap[subcategory.subcategoryCategoryId]; // Get mapped category ID

            if (!correctCategoryId) {
                console.warn(`Warning: Subcategory '${subcategory.name}' has an invalid category reference`);
                continue; // Skip this subcategory if category is missing
            }

            await bannerTemplateModel.createConsentSubcategory(
                correctCategoryId,
                subcategory.subcategoryName,
                subcategory.subcategoryDescription
            );
        }

        // Step 6: Insert partners
        for (const partner of partners) {
            await bannerTemplateModel.createPartner(
                templateId,
                partner.partnerName,
                partner.isBlocked // Ensure correct boolean field name
            );
        }

        // Step 7: Respond with success
        res.status(201).json({ message: "Banner template and related data created successfully", templateId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
},



    // Create a new banner template
    async createBannerTemplate(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, mainText, infoParagraph, headerText, buttonAcceptText, buttonRejectText, buttonConfigureText } = req.body;

        try {
            // Create the banner template
            const templateId = await bannerTemplateModel.createBannerTemplate(
                name, 
                mainText, 
                infoParagraph, 
                headerText, 
                buttonAcceptText, 
                buttonRejectText, 
                buttonConfigureText
            );

            res.status(201).json({ message: "Banner template created successfully", templateId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },


    // Create a new consent portal
    async createConsentPortal(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const { templateId, upperText, lowerText } = req.body;
    
        try {
            // Create the consent portal entry
            const portalId = await bannerTemplateModel.createConsentPortal(templateId, upperText, lowerText);
    
            res.status(201).json({ message: "Consent portal entry created successfully", portalId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },
    

    // Create a new consent category
    async createConsentCategory(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { templateId, name, description, isRequired } = req.body;

        try {
            // Create the consent category
            const categoryId = await bannerTemplateModel.createConsentCategory(templateId, name, description, isRequired);

            res.status(201).json({ message: "Consent category created successfully", categoryId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },

    // Create a new consent subcategory
    async createConsentSubcategory(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { categoryId, name, description } = req.body;

        try {
            // Create the consent subcategory
            const subcategoryId = await bannerTemplateModel.createConsentSubcategory(categoryId, name, description);

            res.status(201).json({ message: "Consent subcategory created successfully", subcategoryId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },

    // Create a new partner
    async createPartner(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { templateId, name, isBlocked } = req.body;

        try {
            // Create the partner
            const partnerId = await bannerTemplateModel.createPartner(templateId, name, isBlocked);

            res.status(201).json({ message: "Partner created successfully", partnerId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },

    // Get all banner templates
    async getAllBannerTemplates(req, res) {
        try {
            const templates = await bannerTemplateModel.getAllBannerTemplates();
            res.json(templates);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },


    // Get a specific consent portal by template ID
    async getConsentPortalByTemplateId(req, res) {
        const { templateId } = req.params;
    
        try {
            const portalEntry = await bannerTemplateModel.getConsentPortalByTemplateId(parseInt(templateId, 10));
            
            if (portalEntry.length === 0) {
                return res.status(404).json({ message: "No consent portal entry found for this template" });
            }
    
            res.json(portalEntry);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },
    

    // Get all consent categories for a specific template
    async getConsentCategories(req, res) {
        const { templateId } = req.params;

        try {
            const categories = await bannerTemplateModel.getConsentCategories(parseInt(templateId, 10));
            res.json(categories);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },

    // Get all consent subcategories for a specific category
    async getConsentSubcategories(req, res) {
        const { categoryId } = req.params;

        try {
            const subcategories = await bannerTemplateModel.getConsentSubcategories(parseInt(categoryId, 10));
            res.json(subcategories);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    },

    // Get all partners for a specific template
    async getPartners(req, res) {
        const { templateId } = req.params;

        try {
            const partners = await bannerTemplateModel.getPartners(parseInt(templateId, 10));
            res.json(partners);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    }
};

export default bannerTemplateController;
