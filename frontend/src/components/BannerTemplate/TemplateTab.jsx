import React from "react";

const TemplateTab = ({ bannerData, setBannerData }) => {
    const handleChange = (e) => {
        setBannerData({ ...bannerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Template Created Successfully!");
    };

    return (
        <div>
            <h3>Create Banner Template</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="text" name="templateName" placeholder="Template Name" value={bannerData.templateName} onChange={handleChange} required />
                <textarea name="mainText" placeholder="Main Text" value={bannerData.mainText} onChange={handleChange} required />
                <textarea name="infoParagraph" placeholder="Info Paragraph" value={bannerData.infoParagraph} onChange={handleChange} required />
                <input type="text" name="headerText" placeholder="Header Text" value={bannerData.headerText} onChange={handleChange} required />
                <input type="text" name="buttonAcceptText" placeholder="Accept Button Text" value={bannerData.buttonAcceptText} onChange={handleChange} required />
                <input type="text" name="buttonRejectText" placeholder="Reject Button Text" value={bannerData.buttonRejectText} onChange={handleChange} required />
                <input type="text" name="buttonConfigureText" placeholder="Configure Button Text" value={bannerData.buttonConfigureText} onChange={handleChange} required />
                <button type="submit">Create Template</button>
            </form>
        </div>
    );
};

export default TemplateTab;
