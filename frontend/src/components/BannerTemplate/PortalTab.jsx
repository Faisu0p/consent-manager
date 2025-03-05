import React from "react";
import "./BannerTemplate.css"; // Reusing existing styles

const PortalTab = ({ bannerData, setBannerData }) => {
    const handleChange = (e) => {
        setBannerData({ ...bannerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Portal Created Successfully!");
    };

    return (
        <div className="banner-template-container"> {/* Same styling as other tabs */}
            <h3 className="banner-template-title">Create Portal</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="text" name="portalName" placeholder="Portal Name" value={bannerData.portalName} onChange={handleChange} required />
                <input type="url" name="portalUrl" placeholder="Portal URL" value={bannerData.portalUrl} onChange={handleChange} required />
                <textarea name="portalDescription" placeholder="Portal Description" value={bannerData.portalDescription} onChange={handleChange} required />
                <button type="submit">Create Portal</button>
            </form>
        </div>
    );
};

export default PortalTab;
