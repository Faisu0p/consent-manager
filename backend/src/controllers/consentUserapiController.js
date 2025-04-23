import consentUserapiModel from "../models/consentUserapiModel.js";

const consentUserController = {


    //______________Api's for User Details______________

    // ✅ Get all user details
    async getAllUsers(req, res) {
        try {
            const users = await consentUserapiModel.getAllUsers();
            res.status(200).json({ success: true, users });
        } catch (error) {
            console.error("Error fetching all users:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },

    // ✅ Get user by email
    async getUserByEmail(req, res) {
        const { email } = req.params;

        try {
            const user = await consentUserapiModel.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            res.status(200).json({ success: true, user });
        } catch (err) {
            console.error("Error fetching user by email:", err);
            res.status(500).json({ success: false, message: "Server error" });
        }
    },

    // ✅ Get user by phone
    async getUserByPhone(req, res) {
        const { phone } = req.params;

        try {
            const user = await consentUserapiModel.getUserByPhone(phone);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            res.status(200).json({ success: true, user });
        } catch (err) {
            console.error("Error fetching user by phone:", err);
            res.status(500).json({ success: false, message: "Server error" });
        }
    },

    // ✅ Get user by ID
    async getUserById(req, res) {
        const { id } = req.params;

        try {
            const user = await consentUserapiModel.getUserById(Number(id));
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            res.status(200).json({ success: true, user });
        } catch (err) {
            console.error("Error fetching user by ID:", err);
            res.status(500).json({ success: false, message: "Server error" });
        }
    },

    // ✅ Get user by username
    async getUserByUsername(req, res) {
        const { username } = req.params;

        try {
            const user = await consentUserapiModel.getUserByUsername(username);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            res.status(200).json({ success: true, user });
        } catch (err) {
            console.error("Error fetching user by username:", err);
            res.status(500).json({ success: false, message: "Server error" });
        }
    },




    // ✅ Get users who gave consent
    async getUsersWhoGaveConsent(req, res) {
        try {
            const users = await consentUserapiModel.getUsersWithConsent();
            res.status(200).json({ success: true, users });
        } catch (err) {
            console.error("Error fetching users with consent:", err);
            res.status(500).json({ success: false, message: "Server error" });
        }
    },

    // ✅ Get users who did not give consent
    async getUsersWhoDidNotGiveConsent(req, res) {
        try {
            const users = await consentUserapiModel.getUsersWithoutConsent();
            res.status(200).json({ success: true, users });
        } catch (err) {
            console.error("Error fetching users without consent:", err);
            res.status(500).json({ success: false, message: "Server error" });
        }
    },


};

export default consentUserController;
