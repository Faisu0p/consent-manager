import React, { useState } from "react";
import "../styles/TemplateLibrary.css";

import ConsentManagement from "../components/ConsentManagement";
import Customization from "./Customization";
import ModifyBanner from "./ModifyBanner";

const TemplateLibrary = () => {
  const [activeTab, setActiveTab] = useState("templates");

  const renderTabContent = () => {
    switch (activeTab) {
      case "templates":
        return <ConsentManagement />;
      case "customization":
        return <Customization />;
      case "modify":
        return <ModifyBanner />;
      default:
        return null;
    }
  };

  return (
    <div className="template-library-container">
      <div className="template-library-tabs">
        <button
          className={`tab-button ${activeTab === "templates" ? "active" : ""}`}
          onClick={() => setActiveTab("templates")}
        >
          Templates
        </button>
        <button
          className={`tab-button ${activeTab === "customization" ? "active" : ""}`}
          onClick={() => setActiveTab("customization")}
        >
          Customization
        </button>
        <button
          className={`tab-button ${activeTab === "modify" ? "active" : ""}`}
          onClick={() => setActiveTab("modify")}
        >
          Modify Banner
        </button>
      </div>

      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TemplateLibrary;
