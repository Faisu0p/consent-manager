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
          <div className="modify-banner-preview">Hello, World!</div>
        </div>
      </div>
    </div>
  );
};

export default ModifyBanner;