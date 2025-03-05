import React from "react";
import "./BannerPreview.css";

const BannerPreview = ({ bannerData, activeTab }) => {
  return (
    <div className="banner-preview">
      <h3>Preview</h3>

      {activeTab === "templates" && (
        <div className="template-preview">
          <h2>{bannerData.template.name || "Consent Manager"}</h2>
          <h4>{bannerData.template.headerText || "Do you agree to let us use cookies?"}</h4>
          <p>{bannerData.template.mainText || "Some sample text here explaining the purpose of the banner."}</p>
          <p>{bannerData.template.infoParagraph || "Additional info about cookies and consent."}</p>

          <div className="buttons">
            <button>{bannerData.template.buttonAcceptText || "I Agree"}</button>
            <button>{bannerData.template.buttonRejectText || "I Disagree"}</button>
            <button>{bannerData.template.buttonConfigureText || "Configure"}</button>
          </div>
        </div>
      )}

      {/* Show Portal, Categories, and Subcategories together */}
      {(activeTab === "portal" || activeTab === "categories" || activeTab === "subcategories") && (
        <div className="portal-preview">
          <h2>{bannerData.portal.template_id || "Template ID"}</h2>
          <p>
            {bannerData.portal.upper_text ||
              "We and our partners place cookies, access and use non-sensitive information from your device to improve our products and personalize ads and other contents throughout this website. You may accept all or part of these operations."}
          </p>

          {/* Display Categories and their Subcategories */}
          {bannerData.categories.length > 0 ? (
            <div className="categories-preview">
              <h4>Categories:</h4>
              <ul>
                {bannerData.categories.map((category) => (
                  <li key={category.id}>
                    <strong>{category.name}</strong>

                    {/* Filter and show subcategories that belong to this category */}
                    <ul>
                      {bannerData.subcategories
                        .filter((sub) => Number(sub.subcategoryCategoryId) === Number(category.id))

                        .map((subcategory) => (
                          <li key={subcategory.id}>- {subcategory.subcategoryName}</li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No categories available</p>
          )}

          <p>
            {bannerData.portal.lower_text ||
              "By giving consent to the purposes above, you also allow this website and its partners to operate the following data processing."}
          </p>
        </div>
      )}

      {activeTab === "partners" && (
        <div className="template-preview">
          <h2>Partners</h2>
          <div className="buttons">
            <button>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerPreview;
