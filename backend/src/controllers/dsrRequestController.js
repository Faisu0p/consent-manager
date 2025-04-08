import dsrRequestModel from "../models/dsrRequestModel.js";

const dsrRequestController = {
    // Create a new DSR request
    async createDSRRequest(req, res) {
        try {
            const { user_id, request_type, reason } = req.body;

            if (!user_id || !request_type || !reason) {
                return res.status(400).json({ message: "All fields are required." });
            }

            const newRequest = await dsrRequestModel.createDSRRequest({
                user_id,
                request_type,
                reason
            });

            res.status(201).json({
                message: "DSR request created successfully.",
                data: newRequest
            });
        } catch (error) {
            console.error("Error creating DSR request:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    },

    // Get all DSR requests
    async getAllDSRRequests(req, res) {
        try {
            const requests = await dsrRequestModel.getAllDSRRequests();
            res.status(200).json({ data: requests });
        } catch (error) {
            console.error("Error fetching DSR requests:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    },

    // Get a DSR request by ID
    async getDSRRequestById(req, res) {
        try {
            const { id } = req.params;

            const request = await dsrRequestModel.getDSRRequestById(id);

            if (!request) {
                return res.status(404).json({ message: "DSR request not found." });
            }

            res.status(200).json({ data: request });
        } catch (error) {
            console.error("Error fetching DSR request:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
};

export default dsrRequestController;
