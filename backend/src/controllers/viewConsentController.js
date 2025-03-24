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
            if (!userId) {
                return res.status(400).json({ success: false, message: "User ID is required" });
            }

            const consents = await viewConsentModel.getUserConsents(userId);
            res.status(200).json({ success: true, consents });
        } catch (error) {
            console.error("Error fetching user consents:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
};

export default viewConsentController;
