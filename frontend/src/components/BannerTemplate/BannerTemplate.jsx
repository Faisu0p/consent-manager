import React, { useState } from "react";
import TemplateTab from "./TemplateTab";
import PortalTab from "./PortalTab";
import CategoryTab from "./CategoryTab";
import SubcategoryTab from "./SubcategoryTab";
import PartnerTab from "./PartnerTab";
import "./BannerTemplate.css";

const BannerTemplate = () => {
    const [activeTab, setActiveTab] = useState("templates");

    return (
        <div className="banner-template-container">
            <h2 className="banner-template-title">Banner Template Management</h2>
            <div className="banner-template-tabs">
                <button onClick={() => setActiveTab("templates")} className={activeTab === "templates" ? "active" : ""}>Templates</button>
                <button onClick={() => setActiveTab("portal")} className={activeTab === "portal" ? "active" : ""}>Portal</button>
                <button onClick={() => setActiveTab("categories")} className={activeTab === "categories" ? "active" : ""}>Categories</button>
                <button onClick={() => setActiveTab("subcategories")} className={activeTab === "subcategories" ? "active" : ""}>Subcategories</button>
                <button onClick={() => setActiveTab("partners")} className={activeTab === "partners" ? "active" : ""}>Partners</button>
            </div>

            <div className="banner-template-content">
                {activeTab === "templates" && <TemplateTab />}
                {activeTab === "portal" && <PortalTab />}
                {activeTab === "categories" && <CategoryTab />}
                {activeTab === "subcategories" && <SubcategoryTab />}
                {activeTab === "partners" && <PartnerTab />}
            </div>
        </div>
    );
};

export default BannerTemplate;
