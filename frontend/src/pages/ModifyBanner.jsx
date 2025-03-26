import React, { useState } from "react";
import "../styles/ModifyBanner.css";

const ModifyBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) return <button onClick={() => setIsOpen(true)}>Open Consent Modal</button>;

  const response = {
    name: "Example Company",
    portal: {
      upper_text: "We use cookies to enhance your experience. You can manage your preferences here.",
      lower_text: "Your choices help us improve your experience while maintaining your privacy.",
    },
    categories: [
      {
        id: 1,
        name: "Essential Cookies",
        subcategories: [{ id: 11, name: "Authentication Cookies" }, { id: 12, name: "Session Cookies" }],
      },
      {
        id: 2,
        name: "Analytics Cookies",
        subcategories: [{ id: 21, name: "Google Analytics" }, { id: 22, name: "Heatmap Tracking" }],
      },
    ],
  };

  return (
    <div className="cookie-config-modal">
      <div className="cookie-portal-banner">
        <div className="cookie-portal-header">
          <div className="cookie-portal-header-left">
            <div className="cookie-portal-icon-container">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2L22 6L12 16H8V12L18 2Z" fill="#2E75B7" />
              </svg>
            </div>
            <h1 className="cookie-banner-company-name">Welcome to {response.name}</h1>
          </div>
          <button className="cookie-portal-close-button" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className="cookie-portal-content">
          <p className="cookie-portal-consent-text">{response.portal.upper_text}</p>

          <div className="cookie-portal-allow-section">
            {response.categories.map((category) => (
              <div key={category.id} className="cookie-portal-allow-item">
                <label className="cookie-portal-category">
                  <input type="checkbox" defaultChecked /> {category.name}
                </label>
                <ul className="cookie-portal-subcategories">
                  {category.subcategories.map((sub) => (
                    <li key={sub.id}>{sub.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="cookie-portal-consent-text">{response.portal.lower_text}</p>
        </div>

        <div className="cookie-portal-footer">
          <div className="cookie-portal-logo-container">
            <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="30" rx="5" fill="#2e75b7" />
              <text x="50%" y="50%" textAnchor="middle" dy=".35em" fill="white" fontSize="14">Your Logo</text>
            </svg>
          </div>
          <div className="cookie-portal-save-container">
            <button className="cookie-portal-save-button">Save</button>
            <p className="cookie-portal-save-text">Set all your preferences to save and continue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyBanner;
