import bannerTemplateModel from "../models/bannerTemplateModel.js";

const getFullBannerTemplateById = async (req, res) => {
    try {
        const templateId = parseInt(req.params.templateId, 10);

        // Validate templateId
        if (isNaN(templateId)) {
            return res.status(400).json({ error: "Invalid template ID" });
        }

        // Step 1: Fetch the banner template
        const template = await bannerTemplateModel.getBannerTemplateById(templateId);
        if (!template) {
            return res.status(404).json({ error: "Banner template not found" });
        }

        // Step 2: Fetch related data for this template
        const [portal, categories, partners] = await Promise.all([
            bannerTemplateModel.getConsentPortalByTemplateId(templateId),
            bannerTemplateModel.getConsentCategories(templateId),
            bannerTemplateModel.getPartners(templateId),
        ]);

        // Step 3: Fetch subcategories for each category asynchronously
        const updatedCategories = await Promise.all(
            categories.map(async (category) => {
                category.subcategories = await bannerTemplateModel.getConsentSubcategories(category.id);
                return category;
            })
        );

        // Step 4: Construct response object
        const response = {
            ...template,
            portal: portal.length > 0 ? portal[0] : null, // Adjust if multiple portals are expected
            categories: updatedCategories,
            partners,
        };

        // Send response
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while fetching banner template details" });
    }
};




const generateConsentScript = async (req, res) => {
    try {
        const { templateId } = req.params;
  
        // Fetch the full template details using model functions
        const template = await bannerTemplateModel.getBannerTemplateById(templateId);
        if (!template) {
            return res.status(404).send("Template not found");
        }
  
        const categories = await bannerTemplateModel.getConsentCategories(templateId);
        const partners = await bannerTemplateModel.getPartners(templateId);
  
        // Fetch subcategories for each category
        for (const category of categories) {
            category.subcategories = await bannerTemplateModel.getConsentSubcategories(category.id);
        }
  
        // Construct the response object
        const response = {
            ...template,
            categories,
            partners,
        };
  
        // Generate JavaScript dynamically using template details
        const scriptContent = `
            (function() {
                if (localStorage.getItem("consentGiven")) return;
  
                var banner = document.createElement("div");
                banner.classList.add("cookie-banner-container");
  
                banner.innerHTML = \`
                    <div class="cookie-banner">
                        <div class="cookie-banner-header">
                            <h1 class="cookie-banner-company-name">${response.name}</h1>
                            <h2 class="cookie-banner-title">${response.header_text}</h2>
                        </div>
                        <div class="cookie-banner-content">
                            <p class="cookie-banner-intro">${response.main_text}</p>
                            <p class="cookie-banner-details">${response.info_paragraph}</p>
                            <div class="cookie-banner-buttons">
                                <button class="cookie-banner-configure-button" onclick="openConfig()">${response.button_configure_text}</button>
                                <button class="cookie-banner-disagree-button" onclick="rejectConsent()">${response.button_reject_text}</button>
                                <button class="cookie-banner-agree-button" onclick="acceptConsent()">${response.button_accept_text}</button>
                            </div>
                        </div>
                    </div>
                \`;
  
                var style = document.createElement("style");
                style.innerHTML = \`
                    .cookie-banner-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        z-index: 10000;
                    }
                    .cookie-banner {
                        background-color: white;
                        border-radius: 10px;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                        width: 90%;
                        max-width: 600px;
                        overflow: hidden;
                        text-align: center;
                        padding: 20px;
                    }
                    .cookie-banner-header {
                        padding: 15px;
                        border-bottom: 1px solid #eaeaea;
                        background-color: #f8f8f8;
                    }
                    .cookie-banner-company-name {
                        font-size: 24px;
                        font-weight: bold;
                        color: #1a2a3a;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                    }
                    .cookie-banner-title {
                        font-size: 18px;
                        font-weight: bold;
                        color: #1a2a3a;
                    }
                    .cookie-banner-content {
                        padding: 20px;
                    }
                    .cookie-banner-intro, .cookie-banner-details {
                        font-size: 14px;
                        color: #333;
                        margin-bottom: 15px;
                    }
                    .cookie-banner-buttons {
                        display: flex;
                        justify-content: space-between;
                        gap: 10px;
                        margin-top: 15px;
                    }
                    .cookie-banner-configure-button,
                    .cookie-banner-disagree-button,
                    .cookie-banner-agree-button {
                        flex: 1;
                        padding: 12px;
                        border-radius: 5px;
                        font-size: 14px;
                        font-weight: bold;
                        cursor: pointer;
                        transition: background-color 0.2s ease;
                        border: none;
                    }
                    .cookie-banner-configure-button {
                        background-color: white;
                        color: #3373cc;
                        border: 1px solid #3373cc;
                    }
                    .cookie-banner-configure-button:hover {
                        background-color: #f0f5ff;
                    }
                    .cookie-banner-disagree-button {
                        background-color: #f1f1f1;
                        color: #333;
                    }
                    .cookie-banner-disagree-button:hover {
                        background-color: #e5e5e5;
                    }
                    .cookie-banner-agree-button {
                        background-color: #3373cc;
                        color: white;
                    }
                    .cookie-banner-agree-button:hover {
                        background-color: #2861b1;
                    }
                \`;
  
                document.head.appendChild(style);
                document.body.appendChild(banner);
  
                window.acceptConsent = function() {
                    localStorage.setItem("consentGiven", "true");
                    document.body.removeChild(banner);
                };
  
                window.rejectConsent = function() {
                    localStorage.setItem("consentGiven", "false");
                    document.body.removeChild(banner);
                };
  
                window.openConfig = function() {
                    alert("Open settings to configure consent");
                };
            })();
        `;
  
        // Return JavaScript response
        res.setHeader("Content-Type", "application/javascript");
        res.send(scriptContent);
    } catch (error) {
        console.error("Error generating script:", error);
        res.status(500).send("Internal Server Error");
    }
  };
  


// Export the controller functions
export { getFullBannerTemplateById, generateConsentScript };
