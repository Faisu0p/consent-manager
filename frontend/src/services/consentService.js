import api from "./api";

const consentService = {
  async getConsents() {
    try {
      const response = await api.get("/consents/all");
      return response.data.consents; // <-- Extract consents array
    } catch (error) {
      console.error("Error fetching consents:", error.response?.data || error.message);
      throw error;
    }
  },
  
  async getUserConsents(userId) {
    try {
      if (!userId) throw new Error("User ID is required");

      const response = await api.get(`/consents/user/${userId}`);
      return response.data.consents; // Extract consents array
    } catch (error) {
      console.error("Error fetching user consents:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default consentService;
