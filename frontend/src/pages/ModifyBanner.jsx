import React, {useState, useEffect} from "react";
import bannerService from "../services/bannerServices";
import "../styles/ModifyBanner.css";

const ModifyBanner = () => {

  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await bannerService.getAllFullBannerTemplates();
        setTemplates(response.templates); // Assuming response contains `templates`
        console.log("All Templates fetched:", response.templates);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
  
    fetchTemplates();
  }, []);
  

  return (
    <div className="modify-banner-container">
      
      {/* Section Heading */}
      <h1 className="modify-banner-heading">Modify Banner Section</h1>
      <p className="modify-banner-description">
        Here you can modify existing banners by adding categories or subcategories.
        Here you can modify existing banners by adding categories or subcategories.
        Here you can modify existing banners by adding categories or subcategories.
      </p>
      
      {/* Dropdown for Template Selection */}
      <div className="modify-banner-dropdown-container">
        <label htmlFor="template-select">Select a Template:</label>
        <select id="template-select" className="modify-banner-dropdown">
          <option value="">-- Choose a Template --</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
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