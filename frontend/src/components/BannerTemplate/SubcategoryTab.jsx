import React, { useEffect } from "react";

const SubcategoryTab = ({ bannerData, setBannerData }) => {
    useEffect(() => {
        console.log("Updated bannerData:", bannerData);
    }, [bannerData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBannerData(prevData => ({
            ...prevData,
            subcategoryForm: {
                ...prevData.subcategoryForm,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setBannerData(prevData => ({
            ...prevData,
            subcategories: [
                ...prevData.subcategories,
                {
                    id: Date.now(),
                    subcategoryCategoryId: prevData.subcategoryForm.subcategoryCategoryId, // Links to category
                    subcategoryName: prevData.subcategoryForm.subcategoryName,
                    subcategoryDescription: prevData.subcategoryForm.subcategoryDescription
                }
            ],
            subcategoryForm: {
                subcategoryCategoryId: "",
                subcategoryName: "",
                subcategoryDescription: ""
            }
        }));
    };

    return (
        <div>
            <h3>Create Consent Subcategory</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                {/* Category Selection Dropdown */}
                <select 
                    name="subcategoryCategoryId" 
                    value={bannerData.subcategoryForm?.subcategoryCategoryId || ""} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Select a Category</option>
                    {bannerData.categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>

                <input type="text" name="subcategoryName" placeholder="Subcategory Name" value={bannerData.subcategoryForm?.subcategoryName || ""} onChange={handleChange} required />
                <textarea name="subcategoryDescription" placeholder="Subcategory Description" value={bannerData.subcategoryForm?.subcategoryDescription || ""} onChange={handleChange} required />
                <button type="submit">Create Subcategory</button>
            </form>
        </div>
    );
};

export default SubcategoryTab;
