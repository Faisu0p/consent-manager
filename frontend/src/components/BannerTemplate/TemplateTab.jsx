import React, { useState } from "react";

const TemplateTab = () => {
    const [form, setForm] = useState({
        name: "",
        mainText: "",
        infoParagraph: "",
        headerText: "",
        buttonAcceptText: "",
        buttonRejectText: "",
        buttonConfigureText: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTemplates([...templates, { ...form, id: Date.now() }]);
        setForm({
            name: "",
            mainText: "",
            infoParagraph: "",
            headerText: "",
            buttonAcceptText: "",
            buttonRejectText: "",
            buttonConfigureText: ""
        });
    };

    return (
        <div>
            <h3>Create Banner Template</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="text" name="name" placeholder="Template Name" value={form.name} onChange={handleChange} required />
                <textarea name="mainText" placeholder="Main Text" value={form.mainText} onChange={handleChange} required />
                <textarea name="infoParagraph" placeholder="Info Paragraph" value={form.infoParagraph} onChange={handleChange} required />
                <input type="text" name="headerText" placeholder="Header Text" value={form.headerText} onChange={handleChange} required />
                <input type="text" name="buttonAcceptText" placeholder="Accept Button Text" value={form.buttonAcceptText} onChange={handleChange} required />
                <input type="text" name="buttonRejectText" placeholder="Reject Button Text" value={form.buttonRejectText} onChange={handleChange} required />
                <input type="text" name="buttonConfigureText" placeholder="Configure Button Text" value={form.buttonConfigureText} onChange={handleChange} required />
                <button type="submit">Create Template</button>
            </form>
        </div>
    );
};

export default TemplateTab;
