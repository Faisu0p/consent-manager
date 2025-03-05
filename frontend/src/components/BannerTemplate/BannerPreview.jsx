import React from "react";
import "./BannerPreview.css";

const BannerPreview = ({ bannerData }) => {
  return (
    <div className="banner-preview">
      <h3>Preview</h3>
      <table>
        <tbody>
          <tr><td><strong>Template Name:</strong></td><td>{bannerData.templateName || "N/A"}</td></tr>
          <tr><td><strong>Portal Name:</strong></td><td>{bannerData.portalName || "N/A"}</td></tr>
          <tr><td><strong>Categories:</strong></td><td>{Array.isArray(bannerData.categories) && bannerData.categories.length > 0 ? bannerData.categories.join(", ") : "None"}</td></tr>
          <tr><td><strong>Subcategories:</strong></td><td>{Array.isArray(bannerData.subcategories) && bannerData.subcategories.length > 0 ? bannerData.subcategories.join(", ") : "None"}</td></tr>
          <tr><td><strong>Partners:</strong></td><td>{Array.isArray(bannerData.partners) && bannerData.partners.length > 0 ? bannerData.partners.join(", ") : "None"}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default BannerPreview;
