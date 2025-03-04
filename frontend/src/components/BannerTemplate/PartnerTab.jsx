import React, { useState } from "react";

const PartnerTab = () => {
    const [form, setForm] = useState({
        templateId: "",
        name: "",
        isBlocked: false
    });

    const [partners, setPartners] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPartners([...partners, { ...form, id: Date.now() }]);
        setForm({ templateId: "", name: "", isBlocked: false });
    };

    return (
        <div>
            <h3>Create Partner</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="number" name="templateId" placeholder="Template ID" value={form.templateId} onChange={handleChange} required />
                <input type="text" name="name" placeholder="Partner Name" value={form.name} onChange={handleChange} required />
                <label>
                    <input type="checkbox" name="isBlocked" checked={form.isBlocked} onChange={handleChange} />
                    Blocked Partner
                </label>
                <button type="submit">Create Partner</button>
            </form>

            <h3>Existing Partners</h3>
            <ul>
                {partners.map((partner) => (
                    <li key={partner.id}>{partner.name} - {partner.isBlocked ? "Blocked" : "Active"}</li>
                ))}
            </ul>
        </div>
    );
};

export default PartnerTab;
