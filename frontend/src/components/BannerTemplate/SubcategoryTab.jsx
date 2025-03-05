import React, { useEffect } from "react";

const SubcategoryTab = ({ bannerData, setBannerData }) => {

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
                    subcategoryCategoryId: prevData.subcategoryForm.subcategoryCategoryId,
                    subcategoryName: prevData.subcategoryForm.subcategoryName,
                    subcategoryDescription: prevData.subcategoryForm.subcategoryDescription
                }
            ],
            // Reset form fields without affecting other bannerData properties
            subcategoryForm: {
                subcategoryCategoryId: "",
                subcategoryName: "",
                subcategoryDescription: ""
            }
        }));
    };

    // 🔹 Debug: Log categories after state updates
    useEffect(() => {
        console.log(bannerData);
    }, [bannerData]);

    return (
        <div>
            <h3>Create Consent Subcategory</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="number" name="subcategoryCategoryId" placeholder="Category ID" value={bannerData.subcategoryForm?.subcategoryCategoryId || ""} onChange={handleChange} required />
                <input type="text" name="subcategoryName" placeholder="Subcategory Name" value={bannerData.subcategoryForm?.subcategoryName || ""} onChange={handleChange} required />
                <textarea name="subcategoryDescription" placeholder="Subcategory Description" value={bannerData.subcategoryForm?.subcategoryDescription || ""} onChange={handleChange} required />
                <button type="submit">Create Subcategory</button>
            </form>
        </div>
    );
};

export default SubcategoryTab;
