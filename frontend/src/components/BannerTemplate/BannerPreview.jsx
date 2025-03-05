import React from "react";
import "./BannerPreview.css";

const BannerPreview = ({ bannerData, activeTab }) => {
  return (
    <div className="banner-preview">
      <h3>Preview</h3>

      {activeTab === "templates" && (
        <div className="template-preview">
          <h2>{bannerData.templateName || "Consent Manager"}</h2>
          <h4>{bannerData.headerText || "Do you agree to let us use cookies?"}</h4>
          <p>{bannerData.mainText || "Some sample text here explaining the purpose of the banner."}</p>
          <p>{bannerData.infoParagraph || "Additional info about cookies and consent."}</p>
          
          <div className="buttons">
            <button>{bannerData.buttonAcceptText || "I Agree"}</button>
            <button>{bannerData.buttonRejectText || "I Disagree"}</button>
            <button>{bannerData.buttonConfigureText || "Configure"}</button>
          </div>
        </div>
      )}


      {/* Portal Preview */}
      {activeTab === "portal" && (
        <div className="portal-preview">
          <h2>{bannerData.template_id || "Template ID"}</h2>
          <p>{bannerData.upper_text || "We and our partners place cookies, access and use non-sensitive information from your device to improve our products and personalize ads and other contents throughout this website. You may accept all or part of these operations."}</p>
          <p>{bannerData.lower_text || "By giving consent to the purposes above, you also allow this website and its partners to operate the following data processing"}</p>
        </div>
      )}

      {/* You can later add more previews here for other tabs like "portal", "categories", etc. */}
    </div>
  );
};

export default BannerPreview;
