import api from "./api";

const dsrService = {
  // Create a new DSR request
  async createDSRRequest(payload) {
    try {
      const response = await api.post("/dsr-requests/create", payload);
      return response.data;
    } catch (error) {
      console.error("Error creating DSR request:", error.response?.data || error.message);
      throw error;
    }
  },

  // Get all DSR requests
  async getAllDSRRequests() {
    try {
      const response = await api.get("/dsr-requests/getall");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching DSR requests:", error.response?.data || error.message);
      throw error;
    }
  },

  // Get DSR request by ID
  async getDSRRequestById(id) {
    try {
      if (!id) throw new Error("DSR request ID is required");

      const response = await api.get(`/dsr-requests/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching DSR request by ID:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default dsrService;
