import React, { useState } from "react";
import "../styles/ViewConsents.css";

const ViewConsents = () => {
  const [view, setView] = useState("list"); // "list" or "form"
  const [selectedConsent, setSelectedConsent] = useState(null);

  // Sample consent data
  const consentData = [
    { id: 1, service: "Marketing Analytics", status: "Granted", date: "2025-03-20", type: "Analytics", permissions: "Tracking, Cookies" },
    { id: 2, service: "Personalized Ads", status: "Denied", date: "2025-03-18", type: "Advertising", permissions: "Targeted Ads" },
  ];

  const handleModifyConsent = (consent) => {
    setSelectedConsent(consent);
    setView("form");
  };

  return (
    <div className="my-consent-container">
      <h1>View Consents</h1>

      {view === "list" ? (
        <div>
          <table className="consent-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Status</th>
                <th>Date</th>
                <th>Type</th>
                <th>Permissions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {consentData.map((consent) => (
                <tr key={consent.id}>
                  <td>{consent.service}</td>
                  <td>{consent.status}</td>
                  <td>{consent.date}</td>
                  <td>{consent.type}</td>
                  <td>{consent.permissions}</td>
                  <td>
                    <button onClick={() => handleModifyConsent(consent)}>Modify</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2>Request Consent Change</h2>
          <form className="consent-form">
            <label>
              Service:
              <input type="text" value={selectedConsent?.service || ""} readOnly />
            </label>
            <label>
              New Status:
              <select>
                <option value="Granted">Granted</option>
                <option value="Denied">Denied</option>
              </select>
            </label>
            <label>
              Reason:
              <textarea placeholder="Enter reason for modifying consent..." />
            </label>
            <div className="form-buttons">
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setView("list")}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewConsents;
