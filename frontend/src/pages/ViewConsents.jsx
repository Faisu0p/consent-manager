import React, {useState, useEffect} from "react";
import consentService from "../services/consentService";
import "../styles/ViewConsents.css";

const ViewConsent = () => {

  // State for storing consents
  const [consents, setConsents] = useState([]);

  // State for search bar and filter dropdown
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // State for selected consent and modal
  const [selectedConsent, setSelectedConsent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(consents.length / itemsPerPage);

  // Fetch consents from the server
  useEffect(() => {
    const fetchConsents = async () => {
      try {
        const data = await consentService.getConsents();
        console.log("Fetched Consents:", data); // Log the API response
        setConsents(data);
      } catch (error) {
        console.error("Failed to fetch consents:", error);
      }
    };
  
    fetchConsents();
  }, []);  
  

  // Event handlers for search bar and filter dropdown
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };


  // Event handlers for modal
  const openModal = (consent) => {
    setSelectedConsent(consent);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedConsent(null);
  };

  // Filtering and pagination logic
  const exportToCSV = () => {
    const csvContent = [
      ["Consent ID", "User ID", "Template", "Category", "Status", "Consent Date"],
      ...consents.map((c, index) => [
        index + 1, // Sequential ID instead of consent_id
        c.user_id, 
        c.template_name || "-",
        `"${c.category_names}"`, // Wrap in quotes to avoid issues with commas
        c.consent_status ? "Accepted" : "Rejected",
        new Date(c.consent_date).toLocaleDateString("en-GB") // Format date
      ])
    ].map(e => e.join(",")).join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "consents.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const exportToJSON = () => {
    const formattedData = consents.map((c, index) => ({
      "Consent ID": index + 1, // Sequential ID
      "User ID": c.user_id,
      "Template": c.template_name || "-",
      "Category": c.category_names,
      "Status": c.consent_status ? "Accepted" : "Rejected", // Fix status key
      "Consent Date": new Date(c.consent_date).toLocaleDateString("en-GB") // Match displayed format
    }));
  
    const jsonStr = JSON.stringify(formattedData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "consents.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
   
  

  return (
    <div className="view-consent-container">
      <h1 className="view-consent-title">Hello, World! This is View Consent PageHello, World!! This is View Consent PageHello, World! This is View Consent Page</h1>

      {/*Search and filter bar*/}
      <div className="view-consent-filter">
        <input
          type="text"
          placeholder="Search by User ID or Email"
          value={searchTerm}
          onChange={handleSearchChange}
          className="view-consent-search"
        />
        
        <select value={statusFilter} onChange={handleStatusChange} className="view-consent-dropdown">
          <option value="">All Statuses</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>
      </div>


      {/* Export Options */}
      <div className="view-consent-export">
        <button className="view-consent-export-btn" onClick={exportToCSV}>Export CSV</button>
        <button className="view-consent-export-btn" onClick={exportToJSON}>Export JSON</button>
      </div>


      {/*Table for displaying consents*/}
      <table className="view-consent-table">
        <thead>
          <tr>
            <th>Consent ID</th>
            <th>User ID</th>
            <th>Template Name</th>
            <th>Category</th>
            <th>Consent Given</th>
            <th>Consent Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {consents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((row, index) => (
            <tr key={row.id || `consent-${index}`}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{row.user_id}</td>
              <td>{row.template_name || "-"}</td>
              <td>{row.category_names}</td>
              <td>{row.consent_status ? "✅" : "❌"}</td>
              <td>{new Date(row.consent_date).toLocaleDateString("en-GB")}</td>
              <td>
                <button className="view-consent-btn">Modify</button>
                <button className="view-consent-btn view-consent-view-btn" onClick={() => openModal(row)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>


      {/*Modal for viewing consent details*/}
      {isModalOpen && selectedConsent && (
        <div className="view-consent-modal">
          <div className="view-consent-modal-content">
            <span className="view-consent-close" onClick={closeModal}>&times;</span>
            <h2>Consent Details</h2>
            <p><strong>Consent ID:</strong> {selectedConsent.id}</p>
            <p><strong>User ID:</strong> {selectedConsent.userId}</p>
            <p><strong>User Email:</strong> {selectedConsent.email}</p>
            <p><strong>Template:</strong> {selectedConsent.template}</p>
            <p><strong>Category:</strong> {selectedConsent.category}</p>
            <p><strong>Status:</strong> {selectedConsent.status ? "✅ Accepted" : "❌ Rejected"}</p>
            <p><strong>Consent Date:</strong> {selectedConsent.date}</p>
            <button className="view-consent-close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}


      {/* Pagination Controls */}
      <div className="view-consent-pagination">
        <button 
          className="view-consent-page-btn" 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          className="view-consent-page-btn" 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>


    </div>
  );
};

export default ViewConsent;