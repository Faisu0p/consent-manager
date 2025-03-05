import React from "react";

const SubcategoryTab = ({ bannerData, setBannerData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBannerData({ ...bannerData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBannerData({
            ...bannerData,
            subcategories: [...bannerData.subcategories, {
                id: Date.now(),
                subcategoryCategoryId: bannerData.subcategoryCategoryId,
                subcategoryName: bannerData.subcategoryName,
                subcategoryDescription: bannerData.subcategoryDescription
            }]
        });

        // Reset only subcategory fields in `bannerData`
        setBannerData({
            ...bannerData,
            subcategoryCategoryId: "",
            subcategoryName: "",
            subcategoryDescription: ""
        });
    };

    return (
        <div>
            <h3>Create Consent Subcategory</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="number" name="subcategoryCategoryId" placeholder="Category ID" value={bannerData.subcategoryCategoryId} onChange={handleChange} required />
                <input type="text" name="subcategoryName" placeholder="Subcategory Name" value={bannerData.subcategoryName} onChange={handleChange} required />
                <textarea name="subcategoryDescription" placeholder="Subcategory Description" value={bannerData.subcategoryDescription} onChange={handleChange} required />
                <button type="submit">Create Subcategory</button>
            </form>
        </div>
    );
};

export default SubcategoryTab;
