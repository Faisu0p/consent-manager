const BannerPreview = ({ bannerData }) => {
    return (
      <div className="banner-preview">
        <h3>Preview</h3>
        <p><strong>Template Name:</strong> {bannerData.templateName}</p>
        <p><strong>Portal Name:</strong> {bannerData.portalName}</p>
        <p><strong>Categories:</strong> {bannerData.categories.join(", ")}</p>
        <p><strong>Subcategories:</strong> {bannerData.subcategories.join(", ")}</p>
        <p><strong>Partners:</strong> {bannerData.partners.join(", ")}</p>
      </div>
    );
  };
  
  export default BannerPreview;
  