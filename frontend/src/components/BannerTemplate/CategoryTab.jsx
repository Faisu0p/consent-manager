import React, { useState } from "react";

const CategoryTab = () => {
    const [form, setForm] = useState({
        templateId: "",
        name: "",
        description: "",
        isRequired: false
    });

    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCategories([...categories, { ...form, id: Date.now() }]);
        setForm({ templateId: "", name: "", description: "", isRequired: false });
    };

    return (
        <div>
            <h3>Create Consent Category</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="number" name="templateId" placeholder="Template ID" value={form.templateId} onChange={handleChange} required />
                <input type="text" name="name" placeholder="Category Name" value={form.name} onChange={handleChange} required />
                <textarea name="description" placeholder="Category Description" value={form.description} onChange={handleChange} required />
                <label>
                    <input type="checkbox" name="isRequired" checked={form.isRequired} onChange={handleChange} />
                    Required Category
                </label>
                <button type="submit">Create Category</button>
            </form>

            <h3>Existing Categories</h3>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.name} - {category.isRequired ? "Required" : "Optional"}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryTab;
