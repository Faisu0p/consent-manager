import React, { useState, useEffect } from "react";
import "../styles/CustomerSupport.css";

const CustomerSupport = () => {
  // Sample data - replace with actual API call
  const [dsrRequests, setDsrRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [responseText, setResponseText] = useState("");
  const [fileToUpload, setFileToUpload] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  
  useEffect(() => {
    // Simulating API call to fetch DSR requests
    setTimeout(() => {
      const mockData = [
        {
          id: "DSR-001",
          userId: 1001,
          userName: "Sarah Johnson",
          email: "sarah.j@example.com",
          requestType: "View PII",
          status: "Pending",
          reason: "I want to know what personal information you have about me.",
          createdAt: "2025-04-01T14:30:00Z",
          userDetails: {
            address: "123 Main St, Anytown",
            phoneNumber: "+1 (555) 123-4567",
            passportNumber: "AB1234567",
            dateOfBirth: "1985-06-15"
          }
        },
        {
          id: "DSR-002",
          userId: 1542,
          userName: "Michael Chen",
          email: "michael.c@example.com",
          requestType: "Modify PII",
          status: "Pending",
          reason: "Requested modification of: Home Address, Phone Number",
          createdAt: "2025-04-03T09:15:00Z",
          userDetails: {
            address: "456 Oak Ave, Somewhere",
            phoneNumber: "+1 (555) 987-6543",
            passportNumber: "CD7654321",
            dateOfBirth: "1990-11-22"
          }
        },
        {
          id: "DSR-003",
          userId: 2103,
          userName: "Emma Rodriguez",
          email: "emma.r@example.com",
          requestType: "Forget Me",
          status: "Pending",
          reason: "I want all my data to be deleted from your systems.",
          createdAt: "2025-04-05T16:45:00Z",
          userDetails: {
            address: "789 Pine St, Elsewhere",
            phoneNumber: "+1 (555) 456-7890",
            passportNumber: "EF9876543",
            dateOfBirth: "1988-03-30"
          }
        },
        {
          id: "DSR-004",
          userId: 1875,
          userName: "John Smith",
          email: "john.s@example.com",
          requestType: "View PII",
          status: "Completed",
          reason: "GDPR compliance review.",
          createdAt: "2025-03-28T11:20:00Z",
          userDetails: {
            address: "101 Elm St, Nowhere",
            phoneNumber: "+1 (555) 234-5678",
            passportNumber: "GH1357924",
            dateOfBirth: "1979-12-05"
          }
        },
        {
          id: "DSR-005",
          userId: 2456,
          userName: "Aisha Patel",
          email: "aisha.p@example.com",
          requestType: "Modify PII",
          status: "Completed",
          reason: "Requested modification of: National ID, Date of Birth",
          createdAt: "2025-03-15T13:10:00Z",
          userDetails: {
            address: "202 Maple Dr, Someplace",
            phoneNumber: "+1 (555) 876-5432",
            passportNumber: "IJ2468013",
            dateOfBirth: "1995-08-17"
          }
        }
      ];
      
      setDsrRequests(mockData);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleRequestSelection = (request) => {
    setSelectedRequest(request);
    setResponseText("");
    setSuccessMessage("");
    setFileToUpload(null);
  };

  const handleFileChange = (e) => {
    setFileToUpload(e.target.files[0]);
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedRequest) return;
    
    const updatedRequests = dsrRequests.map(req => 
      req.id === selectedRequest.id ? { ...req, status: newStatus } : req
    );
    
    setDsrRequests(updatedRequests);
    setSelectedRequest({...selectedRequest, status: newStatus});
    setSuccessMessage(`Request status updated to ${newStatus}`);
    
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleSubmitResponse = () => {
    if (!selectedRequest || !responseText) return;
    
    // Here you would normally send this to your API
    console.log("Submitting response for request:", selectedRequest.id);
    console.log("Response text:", responseText);
    
    if (fileToUpload) {
      console.log("With file:", fileToUpload.name);
    }
    
    // Update status to completed
    handleStatusChange("Completed");
    setResponseText("");
    setFileToUpload(null);
    setSuccessMessage("Response submitted successfully");
  };

  const handleDeleteUser = () => {
    if (!selectedRequest) return;
    
    if (window.confirm(`Are you sure you want to delete all data for ${selectedRequest.userName}? This action cannot be undone.`)) {
      // Here you would call your API to delete the user
      console.log("Deleting user:", selectedRequest.userId);
      
      // Update the request status
      handleStatusChange("Completed");
      setSuccessMessage(`User ${selectedRequest.userName} has been removed from the system`);
    }
  };

  const filteredRequests = dsrRequests.filter(request => {
    if (activeTab !== "all" && request.status.toLowerCase() !== activeTab) {
      return false;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return (
      request.id.toLowerCase().includes(searchLower) ||
      request.userName.toLowerCase().includes(searchLower) ||
      request.email.toLowerCase().includes(searchLower) ||
      request.requestType.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="cs-container">
      <header className="cs-header">
        <div className="cs-header-content">
          <h1>Customer Support Portal</h1>
          <p>Manage Data Subject Requests (DSR)</p>
        </div>
      </header>
      
      <div className="cs-dashboard">
        <div className="cs-sidebar">
          <div className="cs-search">
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="cs-tabs">
            <button 
              className={activeTab === "all" ? "active" : ""} 
              onClick={() => setActiveTab("all")}
            >
              All Requests
            </button>
            <button 
              className={activeTab === "pending" ? "active" : ""} 
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button 
              className={activeTab === "completed" ? "active" : ""} 
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
          </div>
          
          <div className="cs-request-list">
            {isLoading ? (
              <div className="cs-loading">
                <div className="cs-spinner"></div>
                <p>Loading requests...</p>
              </div>
            ) : filteredRequests.length === 0 ? (
              <p className="cs-no-requests">No requests found</p>
            ) : (
              filteredRequests.map(request => (
                <div 
                  key={request.id}
                  className={`cs-request-item ${selectedRequest?.id === request.id ? 'selected' : ''}`}
                  onClick={() => handleRequestSelection(request)}
                >
                  <div className="cs-request-header">
                    <span className="cs-request-id">{request.id}</span>
                    <span className={`cs-status cs-status-${request.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {request.status}
                    </span>
                  </div>
                  <h3 className="cs-request-name">{request.userName}</h3>
                  <p className="cs-request-type">{request.requestType}</p>
                  <p className="cs-request-date">
                    {new Date(request.createdAt).toLocaleDateString()} at {new Date(request.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="cs-content">
          {!selectedRequest ? (
            <div className="cs-no-selection">
              <div className="cs-empty-state">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" fill="#ccc"/>
                  <path d="M12 12C13.65 12 15 10.65 15 9C15 7.35 13.65 6 12 6C10.35 6 9 7.35 9 9C9 10.65 10.35 12 12 12ZM12 8C12.55 8 13 8.45 13 9C13 9.55 12.55 10 12 10C11.45 10 11 9.55 11 9C11 8.45 11.45 8 12 8Z" fill="#ccc"/>
                  <path d="M18 16.58C18 14.08 14.03 13 12 13C9.97 13 6 14.08 6 16.58V18H18V16.58ZM8.48 16C9.22 15.49 10.71 15 12 15C13.3 15 14.78 15.49 15.52 16H8.48Z" fill="#ccc"/>
                </svg>
                <h2>No request selected</h2>
                <p>Select a request from the list to view details</p>
              </div>
            </div>
          ) : (
            <div className="cs-request-details">
              {successMessage && (
                <div className="cs-success-message">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#4CAF50"/>
                  </svg>
                  {successMessage}
                </div>
              )}
              
              <div className="cs-details-header">
                <div>
                  <h2>{selectedRequest.id}: {selectedRequest.requestType}</h2>
                  <span className={`cs-status cs-status-${selectedRequest.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {selectedRequest.status}
                  </span>
                </div>
                <div className="cs-actions">
                  <select 
                    value={selectedRequest.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="cs-status-dropdown"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              
              <div className="cs-details-grid">
                <div className="cs-user-info">
                  <h3>User Information</h3>
                  <div className="cs-info-item">
                    <label>User ID:</label>
                    <span>{selectedRequest.userId}</span>
                  </div>
                  <div className="cs-info-item">
                    <label>Name:</label>
                    <span>{selectedRequest.userName}</span>
                  </div>
                  <div className="cs-info-item">
                    <label>Email:</label>
                    <span>{selectedRequest.email}</span>
                  </div>
                  <div className="cs-info-item">
                    <label>Request Date:</label>
                    <span>{new Date(selectedRequest.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="cs-request-info">
                  <h3>Request Details</h3>
                  <div className="cs-info-item">
                    <label>Request Type:</label>
                    <span>{selectedRequest.requestType}</span>
                  </div>
                  <div className="cs-info-item">
                    <label>Reason:</label>
                    <span>{selectedRequest.reason}</span>
                  </div>
                  <div className="cs-info-item">
                    <label>Status:</label>
                    <span className={`cs-status cs-status-${selectedRequest.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {selectedRequest.status}
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedRequest.userDetails && (
                <div className="cs-personal-data">
                  <h3>User's Personal Information</h3>
                  <div className="cs-pii-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Data Type</th>
                          <th>Value</th>
                          {selectedRequest.requestType === "Modify PII" && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(selectedRequest.userDetails).map(([key, value]) => (
                          <tr key={key}>
                            <td>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</td>
                            <td>{value}</td>
                            {selectedRequest.requestType === "Modify PII" && (
                              <td>
                                <button className="cs-action-btn cs-edit-btn">Edit</button>
                                <button className="cs-action-btn cs-delete-btn">Delete</button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              <div className="cs-response-section">
                <h3>Response</h3>
                
                {selectedRequest.requestType === "View PII" && (
                  <div className="cs-file-upload">
                    <p>Upload user's personal information export:</p>
                    <input 
                      type="file"
                      onChange={handleFileChange}
                      className="cs-file-input"
                    />
                    {fileToUpload && (
                      <div className="cs-file-preview">
                        <p>File selected: {fileToUpload.name}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {selectedRequest.requestType === "Forget Me" && (
                  <div className="cs-forget-me">
                    <div className="cs-warning">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="#FFC107"/>
                      </svg>
                      <p>This action will permanently delete all data associated with this user and cannot be undone.</p>
                    </div>
                    <button 
                      className="cs-action-btn cs-delete-btn cs-delete-user"
                      onClick={handleDeleteUser}
                    >
                      Delete User Data
                    </button>
                  </div>
                )}
                
                <textarea
                  className="cs-response-textarea"
                  placeholder="Type your response to the user here..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={5}
                ></textarea>
                
                <button 
                  className="cs-submit-response"
                  onClick={handleSubmitResponse}
                  disabled={!responseText}
                >
                  Send Response
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;