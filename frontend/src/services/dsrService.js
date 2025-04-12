import api from "./api";

// Helper function to add user details
const addUserDetails = (request) => ({
  ...request,
  userDetails: {
    address: "123 Main St, Anytown",
    phoneNumber: "+1 (555) 123-4567",
    passportNumber: "AB1234567",
    dateOfBirth: "1985-06-15"
  }
});

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
  },

  // Get a DSR request by ID for customer support (with hardcoded user details)
  async getDSRRequestForSupportById(id) {
    try {
      if (!id) throw new Error("DSR request ID is required");

      const response = await api.get(`/dsr-requests/support/get/${id}`);
      const request = response.data.data;

      if (!request) {
        throw new Error("DSR request not found");
      }

      return addUserDetails(request);
    } catch (error) {
      console.error("Error fetching DSR details for support:", error.response?.data || error.message);
      throw error;
    }
  },

  // Fetch all DSR requests for customer support
  async getAllDSRRequestsForSupport() {
    try {
      const response = await api.get("/dsr-requests/support/getall");
      const requests = response.data.data;

      const responseWithDetails = requests.map(addUserDetails);
      return { data: responseWithDetails };
    } catch (error) {
      console.error("Error fetching all DSR requests for support:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default dsrService;
