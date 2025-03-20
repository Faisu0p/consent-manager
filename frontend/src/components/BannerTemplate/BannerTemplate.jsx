import React, { useState, useEffect } from "react";
import bannerTemplateService from "../../services/bannerServices";
import TemplateTab from "./TemplateTab";
import PortalTab from "./PortalTab";
import CategoryTab from "./CategoryTab";
import SubcategoryTab from "./SubcategoryTab";
import PartnerTab from "./PartnerTab";
import "./BannerTemplate.css";

const BannerTemplate = ({ bannerData, setBannerData,activeTab,setActiveTab }) => {

    const [selectedLanguage, setSelectedLanguage] = useState(""); // Store selected language
    const [englishTemplates, setEnglishTemplates] = useState([]); // Store English templates
    const [parentTemplateId, setParentTemplateId] = useState(""); // Store selected parent template

    const languages = [
        { code: "en", name: "English" },
        { code: "hi", name: "Hindi" },
        { code: "fr", name: "French" }
    ];

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        setSelectedLanguage(newLanguage);

        setParentTemplateId(""); // Reset parent template id

        setBannerData(prevData => ({
            ...prevData,
            template: {
                ...prevData.template,
                language_code: newLanguage, // Store language inside template object
                parent_template_id: null // Reset parent template id
            }
        }));
        console.log("Selected Language:", newLanguage);
    };

    useEffect(() => {
        const fetchEnglishTemplates = async () => {
            try {
                const templates = await bannerTemplateService.getEnglishBannerTemplates();
                setEnglishTemplates(templates); // Set fetched templates in state
            } catch (error) {
                console.error("Error fetching English templates:", error);
            }
        };
    
        fetchEnglishTemplates();
    }, []);
    
    


    return (
        <div className="banner-template-container">
            <h2 className="banner-template-title">Banner Template Management</h2>
            <div className="banner-template-tabs">
                <button onClick={() => setActiveTab("templates")} disabled={!selectedLanguage} className={activeTab === "templates" ? "active" : ""}>Templates</button>
                <button onClick={() => setActiveTab("portal")} disabled={!selectedLanguage} className={activeTab === "portal" ? "active" : ""}>Portal</button>
                <button onClick={() => setActiveTab("categories")} disabled={!selectedLanguage} className={activeTab === "categories" ? "active" : ""}>Categories</button>
                <button onClick={() => setActiveTab("subcategories")} disabled={!selectedLanguage} className={activeTab === "subcategories" ? "active" : ""}>Subcategories</button>
                <button onClick={() => setActiveTab("partners")} disabled={!selectedLanguage} className={activeTab === "partners" ? "active" : ""}>Partners</button>
            </div>

            <div className="language-selection">
                <label>Select Language:</label>
                <select value={bannerData.template?.language_code || ""} onChange={handleLanguageChange}>
                    <option value="">-- Select Language --</option>
                    {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                </select>
            </div>

            {selectedLanguage && selectedLanguage !== "en" && (
                <div className="parent-template-selection">
                    <label>Select English Template:</label>
                    <select value={parentTemplateId} onChange={(e) => {
                        const selectedId = e.target.value;
                        setParentTemplateId(selectedId);
                        setBannerData(prevData => ({
                            ...prevData,
                            template: {
                                ...prevData.template,
                                parent_template_id: selectedId || null 
                            }
                        }));
                    }}>
                        <option value="">-- Select English Template --</option>
                        {englishTemplates.map(template => (
                            <option key={template.id} value={template.id}>{template.name}</option>
                        ))}
                    </select>
                </div>
            )}


            {selectedLanguage && (
                <div className="banner-template-content">
                    {activeTab === "templates" && <TemplateTab bannerData={bannerData} setBannerData={setBannerData} setActiveTab={setActiveTab} />}
                    {activeTab === "portal" && <PortalTab bannerData={bannerData} setBannerData={setBannerData} setActiveTab={setActiveTab}/>}
                    {activeTab === "categories" && <CategoryTab bannerData={bannerData} setBannerData={setBannerData} setActiveTab={setActiveTab}/>}
                    {activeTab === "subcategories" && <SubcategoryTab bannerData={bannerData} setBannerData={setBannerData} />}
                    {activeTab === "partners" && <PartnerTab bannerData={bannerData} setBannerData={setBannerData} />}
                </div>
            )}

        </div>
    );
};

export default BannerTemplate;
