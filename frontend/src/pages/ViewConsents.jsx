import React, {useState, useEffect} from "react";
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


  // Sample data for testing (replace with API data later)
  useEffect(() => {
    setConsents([
      { id: 1, userId: "12345", template: "Marketing Banner", category: "Analytics", status: true, date: "2025-03-24" },
      { id: 2, userId: "67890", template: "Legal Notice", category: "Compliance", status: false, date: "2025-03-22" }
    ]);
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
      ...consents.map((c) => [
        c.id, c.userId, c.template, c.category, c.status ? "Accepted" : "Rejected", c.date
      ])
    ].map(e => e.join(",")).join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "consents.csv";
    link.click();
  };
  
  const exportToJSON = () => {
    const jsonStr = JSON.stringify(consents, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "consents.json";
    link.click();
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
        {consents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.userId}</td>
            <td>{row.template}</td>
            <td>{row.category}</td>
            <td>{row.status ? "✅" : "❌"}</td>
            <td>{row.date}</td>
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


      {/* Export Options */}
      <div className="view-consent-export">
        <button className="view-consent-export-btn" onClick={exportToCSV}>Export CSV</button>
        <button className="view-consent-export-btn" onClick={exportToJSON}>Export JSON</button>
      </div>


    </div>
  );
};

export default ViewConsent;