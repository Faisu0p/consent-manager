import React from "react";
import "./BannerTemplate.css"; // Reusing existing styles

const PortalTab = ({ bannerData, setBannerData }) => {
    
    const handleChange = (e) => {
        setBannerData({
            ...bannerData,
            portal: {
                ...bannerData.portal,
                [e.target.name]: e.target.value
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bannerData);
        alert("Portal Created Successfully!");
    };

    return (
        <div className="banner-template-container"> {/* Same styling as other tabs */}
            <h3 className="banner-template-title">Create Portal</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="text" name="template_id" placeholder="Template ID" value={bannerData.portal.template_id} onChange={handleChange} required />
                <textarea name="upper_text" placeholder="Upper Text" value={bannerData.portal.upper_text} onChange={handleChange} required />
                <textarea name="lower_text" placeholder="Lower Text" value={bannerData.portal.lower_text} onChange={handleChange} required />
                <button type="submit">Create Portal</button>
            </form>
        </div>
    );
};

export default PortalTab;
