import viewConsentModel from "../models/viewConsentModel.js";

const viewConsentController = {
    // Get all user consents
    async getAllConsents(req, res) {
        try {
            const consents = await viewConsentModel.getAllConsents();
            res.status(200).json({ success: true, consents });
        } catch (error) {
            console.error("Error fetching consents:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    },

    // Get consents for a specific user
    async getUserConsents(req, res) {
        try {
            const { userId } = req.params;
            if (!userId || isNaN(userId)) {
                return res.status(400).json({ success: false, message: "Valid User ID is required" });
            }

            const consents = await viewConsentModel.getUserConsents(userId);

            if (!consents || consents.length === 0) {
                return res.status(404).json({ success: false, message: "No consents found for this user" });
            }

            // Fetch and attach categories, subcategories, and partners
            for (let consent of consents) {
                const categories = await viewConsentModel.getCategoriesByConsentId(consent.consent_id);

                for (let category of categories) {
                    category.subcategories = await viewConsentModel.getSubcategoriesByCategoryId(category.category_id);
                }

                consent.categories = categories;
                consent.partners = await viewConsentModel.getPartnersByTemplateId(consent.template_id);
            }

            res.status(200).json({ success: true, consents });
        } catch (error) {
            console.error("Error fetching user consents:", error);
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }

};

export default viewConsentController;
