import React from "react";
import "./BannerPreview.css";

const BannerPreview = ({ bannerData, activeTab }) => {
  return (
    <div className="banner-preview">
      <h3>Preview</h3>

      {activeTab === "templates" && (
        <div className="template-preview">
          <h2>{bannerData.template.name || "Secure Banking"}</h2>
          <h4>{bannerData.template.headerText || "Your Security is Our Priority"}</h4>
          <p>{bannerData.template.mainText || "We use cookies to enhance your banking experience, ensure secure transactions, and improve our services. By selecting 'Accept & Continue', you consent to the use of essential and analytical cookies for secure banking and improved services."}</p>
          <p>{bannerData.template.infoParagraph || "Essential cookies ensure secure logins and fraud prevention. Others help personalize your banking experience. You can manage your preferences anytime."}</p>

          <div className="buttons">
            <button>{bannerData.template.buttonAcceptText || "Accept & Continue"}</button>
            <button>{bannerData.template.buttonRejectText || "Decline Cookies"}</button>
            <button>{bannerData.template.buttonConfigureText || "Manage Preferences"}</button>
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
          <h2>Our Partners</h2>
          {bannerData.partners && bannerData.partners.length > 0 ? (
            <ul className="partners-list">
              {bannerData.partners.map((partner) => (
                <li key={partner.id}>
                  <strong>{partner.partnerName}</strong> (Template ID: {partner.partnerTemplateId})
                  {partner.isBlocked ? <span className="blocked"> - Blocked</span> : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p>No partners available</p>
          )}
        </div>
      )}



    </div>
  );
};

export default BannerPreview;
