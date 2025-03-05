import React, { useState } from "react";
import "./BannerTemplate.css"; // Reusing existing styles

const PortalTab = () => {
    const [form, setForm] = useState({
        name: "",
        url: "",
        description: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPortals([...portals, { ...form, id: Date.now() }]);
        setForm({
            name: "",
            url: "",
            description: ""
        });
    };

    return (
        <div className="banner-template-container"> {/* Same styling as other tabs */}
            <h3 className="banner-template-title">Create Portal</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="text" name="name" placeholder="Portal Name" value={form.name} onChange={handleChange} required />
                <input type="url" name="url" placeholder="Portal URL" value={form.url} onChange={handleChange} required />
                <textarea name="description" placeholder="Portal Description" value={form.description} onChange={handleChange} required />
                <button type="submit">Create Portal</button>
            </form>
        </div>
    );
};

export default PortalTab;
