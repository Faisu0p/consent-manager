import React, {useState} from "react";
import "../styles/ViewConsents.css";

const ViewConsent = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // For filtering by consent status

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
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
          {/* Example static data, replace with dynamic rendering later */}
          <tr>
            <td>1</td>
            <td>12345</td>
            <td>Marketing Banner</td>
            <td>Analytics</td>
            <td>✅</td>
            <td>2025-03-24</td>
            <td>
              <button className="view-consent-btn">Modify</button>
              <button className="view-consent-btn view-consent-view-btn">View</button>
            </td>
          </tr>
        </tbody>
      </table>


    </div>
  );
};

export default ViewConsent;