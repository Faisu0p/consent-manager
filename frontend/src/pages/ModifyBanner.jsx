import React from "react";
import "../styles/ModifyBanner.css";

const ModifyBanner = () => {
  return (
    <div className="modify-banner-container">
      
      {/* Section Heading */}
      <h1 className="modify-banner-heading">Modify Banner Section</h1>
      <p className="modify-banner-description">
        Here you can modify existing banners by adding categories or subcategories.
      </p>
      
      {/* Dropdown for Template Selection */}
      <div className="modify-banner-dropdown-container">
        <label htmlFor="template-select">Select a Template:</label>
        <select id="template-select" className="modify-banner-dropdown">
          <option value="">-- Choose a Template --</option>
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
          <option value="template3">Template 3</option>
        </select>
      </div>
      
      {/* Layout with Two Sections */}
      <div className="modify-banner-content">
        
        {/* Left Section - Categories and Subcategories */}
        <div className="modify-banner-left">
          <h2>Add Categories & Subcategories</h2>
          <p>Feature to add categories and subcategories will go here.</p>
        </div>



        
{/* Right Section - Banner Preview */}
<div className="modify-banner-right">
  <h2>Banner Preview</h2>

    <div className="modify-banner-portal-banner">

      <div className="modify-banner-portal-header">
        <div className="modify-banner-portal-icon-container">
          <div className="modify-banner-portal-pen-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2L22 6L12 16H8V12L18 2Z" fill="#2E75B7"/>
            </svg>
          </div>
        </div>
        <h1 className="modify-banner-company-name">Welcome to Example Corp</h1>
      </div>

      <div className="modify-banner-portal-content">
        <p className="modify-banner-consent-text">
          We use cookies to enhance your experience. You can manage your preferences here.
        </p>

        <div className="modify-banner-portal-allow-section">
          <div className="modify-banner-portal-allow-item">
            <label>
              <input type="checkbox" checked className="modify-banner-category-checkbox" /> Essential Cookies
            </label>
            <ul>
              <li>Security</li>
              <li>Authentication</li>
            </ul>
          </div>
          <div className="modify-banner-portal-allow-item">
            <label>
              <input type="checkbox" className="modify-banner-category-checkbox" /> Marketing Cookies
            </label>
            <ul>
              <li>Personalized Ads</li>
              <li>Tracking</li>
            </ul>
          </div>
        </div>

        <p className="modify-banner-consent-text">
          You can modify your preferences anytime in settings.
        </p>
      </div>

      <div className="modify-banner-portal-footer">
        <div className="modify-banner-portal-logo-container">
          <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="30" rx="5" fill="#2e75b7"/>
            <text x="50%" y="50%" text-anchor="middle" dy=".35em" fill="white" font-size="14" font-family="Arial, sans-serif">
              Your Logo
            </text>
          </svg>
        </div>
        <div className="modify-banner-portal-save-container">
          <button className="modify-banner-portal-save-button">Save</button>
          <p className="modify-banner-portal-save-text">Set all your preferences to save and continue</p>
        </div>
      </div>

    </div>
</div>





      </div>
    </div>
  );
};

export default ModifyBanner;