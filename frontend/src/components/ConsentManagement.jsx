import React, { useState, useEffect } from "react";
import bannerService from "../services/bannerServices";
import CookieConsent from "../components/CookieConsent";
import CookieConsentPortal from "../components/CookieConsentPortal";
import "../styles/ConsentManagement.css"; // Import CSS file

const ConsentManagement = () => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(""); 
  const [scriptGenerated, setScriptGenerated] = useState(false);
  const [templates, setTemplates] = useState([]);

  const openPortal = () => setIsPortalOpen(true);
  const closePortal = () => setIsPortalOpen(false);

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
    setScriptGenerated(false);
  };

  const generateScript = () => {
    if (selectedTemplate) {
      setScriptGenerated(true);
    }
  };

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

  const selectedTemplateData = templates.find(template => String(template.id) === selectedTemplate) || null;


  return (
    <div className="consent-management-container">
      <div className="consent-management-header">
        <h2>Consent Management</h2>
      </div>

      {/* Dropdown for selecting a template */}
      <div className="consent-management-dropdown">
        <label htmlFor="template-select">Choose a template:</label>
        <select id="template-select" value={selectedTemplate} onChange={handleTemplateChange}>
          <option value="">-- Select Template --</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {/* Preview Section */}
      <div className="consent-management-preview">
        {!isPortalOpen ? (
          <CookieConsent openPortal={openPortal} templateData={selectedTemplateData} />
        ) : (
          <CookieConsentPortal onClose={closePortal} templateData={selectedTemplateData} />
        )}
      </div>

      {/* Generate Script Button */}
      <div className="consent-management-button-container">
        <button className="consent-management-generate-button" onClick={generateScript} disabled={!selectedTemplate}>
          Generate Script
        </button>
      </div>

      {/* Display generated script message */}
      {scriptGenerated && (
        <div className="consent-management-script-output">
          <p>Script generated. Copy here:</p>
          <textarea readOnly value={`<script>Generated script for ${selectedTemplate}</script>`} />
        </div>
      )}
    </div>
  );
};

export default ConsentManagement;
