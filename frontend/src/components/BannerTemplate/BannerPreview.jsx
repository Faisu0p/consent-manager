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

      {/* You can later add more previews here for other tabs like "portal", "categories", etc. */}
    </div>
  );
};

export default BannerPreview;
