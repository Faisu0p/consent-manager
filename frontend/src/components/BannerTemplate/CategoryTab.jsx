import React, { useEffect } from "react";

const CategoryTab = ({ bannerData, setBannerData }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBannerData(prevData => ({
            ...prevData,
            categoryForm: {
                ...prevData.categoryForm,
                [name]: type === "checkbox" ? checked : value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setBannerData(prevData => ({
            ...prevData,
            categories: [
                ...(prevData.categories || []), // Ensure categories is always an array
                {
                    id: Date.now(),
                    templateId: prevData.categoryForm.templateId,
                    name: prevData.categoryForm.name,
                    description: prevData.categoryForm.description,
                    isRequired: prevData.categoryForm.isRequired
                }
            ],
            categoryForm: { templateId: "", name: "", description: "", isRequired: false } // Reset form
        }));
    };

    // 🔹 Debug: Log categories after state updates
    useEffect(() => {
        console.log(bannerData);
    }, [bannerData]);

    return (
        <div>
            <h3>Create Consent Category</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="number" name="templateId" placeholder="Template ID" value={bannerData.categoryForm?.templateId || ""} onChange={handleChange} required />
                <input type="text" name="name" placeholder="Category Name" value={bannerData.categoryForm?.name || ""} onChange={handleChange} required />
                <textarea name="description" placeholder="Category Description" value={bannerData.categoryForm?.description || ""} onChange={handleChange} required />
                <label>
                    <input type="checkbox" name="isRequired" checked={bannerData.categoryForm?.isRequired || false} onChange={handleChange} />
                    Required Category
                </label>
                <button type="submit">Create Category</button>
            </form>

            {/* <h4>Categories List</h4>
            <ul>
                {bannerData.categories.length > 0 ? (
                    bannerData.categories.map(category => (
                        <li key={category.id}>{category.name} - {category.description}</li>
                    ))
                ) : (
                    <li>No categories added</li>
                )}
            </ul> */}
        </div>
    );
};

export default CategoryTab;
