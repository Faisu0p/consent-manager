import React from "react";

const CategoryTab = ({ bannerData, setBannerData }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBannerData({ ...bannerData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBannerData({
            ...bannerData,
            categories: [...bannerData.categories, { 
                id: Date.now(), 
                categoryTemplateId: bannerData.categoryTemplateId,
                categoryName: bannerData.categoryName,
                categoryDescription: bannerData.categoryDescription,
                categoryIsRequired: bannerData.categoryIsRequired
            }]
        });

        // Reset only category fields in `bannerData`
        setBannerData({ 
            ...bannerData, 
            categoryTemplateId: "", 
            categoryName: "", 
            categoryDescription: "", 
            categoryIsRequired: false 
        });
    };

    return (
        <div>
            <h3>Create Consent Category</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="number" name="categoryTemplateId" placeholder="Template ID" value={bannerData.categoryTemplateId} onChange={handleChange} required />
                <input type="text" name="categoryName" placeholder="Category Name" value={bannerData.categoryName} onChange={handleChange} required />
                <textarea name="categoryDescription" placeholder="Category Description" value={bannerData.categoryDescription} onChange={handleChange} required />
                <label>
                    <input type="checkbox" name="categoryIsRequired" checked={bannerData.categoryIsRequired} onChange={handleChange} />
                    Required Category
                </label>
                <button type="submit">Create Category</button>
            </form>
        </div>
    );
};

export default CategoryTab;
