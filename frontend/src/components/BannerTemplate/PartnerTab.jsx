import React from "react";

const PartnerTab = ({ bannerData, setBannerData }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBannerData({ ...bannerData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBannerData({
            ...bannerData,
            partners: [...bannerData.partners, {
                id: Date.now(),
                partnerTemplateId: bannerData.partnerTemplateId,
                partnerName: bannerData.partnerName,
                isBlocked: bannerData.isBlocked
            }]
        });

        // Reset only partner-related fields in `bannerData`
        setBannerData({
            ...bannerData,
            partnerTemplateId: "",
            partnerName: "",
            isBlocked: false
        });
    };

    return (
        <div>
            <h3>Create Partner</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="number" name="partnerTemplateId" placeholder="Template ID" value={bannerData.partnerTemplateId} onChange={handleChange} required />
                <input type="text" name="partnerName" placeholder="Partner Name" value={bannerData.partnerName} onChange={handleChange} required />
                <label>
                    <input type="checkbox" name="isBlocked" checked={bannerData.isBlocked} onChange={handleChange} />
                    Blocked Partner
                </label>
                <button type="submit">Create Partner</button>
            </form>
        </div>
    );
};

export default PartnerTab;
