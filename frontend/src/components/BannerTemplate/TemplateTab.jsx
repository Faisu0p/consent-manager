import React from "react";

const TemplateTab = ({ bannerData, setBannerData }) => {
    const handleChange = (e) => {
        setBannerData({
            ...bannerData,
            template: { 
                ...bannerData.template, 
                [e.target.name]: e.target.value 
            },
        });
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bannerData);
        alert("Template Created Successfully!");
    };

    return (
        <div>
            <h3>Create Banner Template</h3>
            <form onSubmit={handleSubmit} className="banner-template-form">
                <input type="text" name="name" placeholder="Template Name" value={bannerData.template.name} onChange={handleChange} required />
                <input type="text" name="headerText" placeholder="Header Text" value={bannerData.template.headerText} onChange={handleChange} required />
                <textarea name="mainText" placeholder="Main Text" value={bannerData.template.mainText} onChange={handleChange} required />
                <textarea name="infoParagraph" placeholder="Info Paragraph" value={bannerData.template.infoParagraph} onChange={handleChange} required />
                <input type="text" name="buttonAcceptText" placeholder="Accept Button Text" value={bannerData.template.buttonAcceptText} onChange={handleChange} required />
                <input type="text" name="buttonRejectText" placeholder="Reject Button Text" value={bannerData.template.buttonRejectText} onChange={handleChange} required />
                <input type="text" name="buttonConfigureText" placeholder="Configure Button Text" value={bannerData.template.buttonConfigureText} onChange={handleChange} required />
                <button type="submit">Create Template</button>
            </form>
        </div>
    );
};

export default TemplateTab;
