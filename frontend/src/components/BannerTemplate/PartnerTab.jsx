import React, { useState, useEffect } from "react";

const PartnerTab = ({ bannerData, setBannerData }) => {
    // Separate state for form inputs
    const [partnerForm, setPartnerForm] = useState({
        partnerTemplateId: "",
        partnerName: "",
        isBlocked: false
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPartnerForm({ ...partnerForm, [name]: type === "checkbox" ? checked : value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const newPartner = {
            id: Date.now(),
            ...partnerForm
        };

        setBannerData((prevData) => ({
            ...prevData,
            partners: [...prevData.partners, newPartner]
        }));

        // Reset form state
        setPartnerForm({
            partnerTemplateId: "",
            partnerName: "",
            isBlocked: false
        });
    };

    // Debug: Log latest bannerData updates
    useEffect(() => {
        console.log("Updated Banner Data:", bannerData);
    }, [bannerData]);

    return (
        <div>
            <h3>Create Partner</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input
                    type="number"
                    name="partnerTemplateId"
                    placeholder="Template ID"
                    value={partnerForm.partnerTemplateId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="partnerName"
                    placeholder="Partner Name"
                    value={partnerForm.partnerName}
                    onChange={handleChange}
                    required
                />
                <label>
                    <input
                        type="checkbox"
                        name="isBlocked"
                        checked={partnerForm.isBlocked}
                        onChange={handleChange}
                    />
                    Blocked Partner
                </label>
                <button type="submit">Create Partner</button>
            </form>
        </div>
    );
};

export default PartnerTab;
