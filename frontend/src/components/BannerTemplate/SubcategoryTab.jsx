import React, { useState } from "react";

const SubcategoryTab = () => {
    const [form, setForm] = useState({
        categoryId: "",
        name: "",
        description: ""
    });

    const [subcategories, setSubcategories] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubcategories([...subcategories, { ...form, id: Date.now() }]);
        setForm({ categoryId: "", name: "", description: "" });
    };

    return (
        <div>
            <h3>Create Consent Subcategory</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="number" name="categoryId" placeholder="Category ID" value={form.categoryId} onChange={handleChange} required />
                <input type="text" name="name" placeholder="Subcategory Name" value={form.name} onChange={handleChange} required />
                <textarea name="description" placeholder="Subcategory Description" value={form.description} onChange={handleChange} required />
                <button type="submit">Create Subcategory</button>
            </form>

            <h3>Existing Subcategories</h3>
            <ul>
                {subcategories.map((subcategory) => (
                    <li key={subcategory.id}>{subcategory.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SubcategoryTab;
