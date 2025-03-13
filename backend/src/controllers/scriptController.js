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

                function setCookie(name, value, days) {
                    var expires = "";
                    if (days) {
                        var date = new Date();
                        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                        expires = "; expires=" + date.toUTCString();
                    }
                    document.cookie = name + "=" + value + "; path=/; SameSite=None; Secure" + expires;
                }

                function getCookie(name) {
                    var nameEQ = name + "=";
                    var ca = document.cookie.split(';');
                    for(var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                    }
                    return null;
                }

                if (getCookie("consentGiven")) return;
  
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
                        padding: 12px 20px;
                        border-radius: 25px; /* Makes buttons more cylindrical */
                        font-size: 14px;
                        font-weight: bold;
                        cursor: pointer;
                        transition: background-color 0.2s ease, transform 0.1s ease;
                        border: none;
                    }

                    .cookie-banner-configure-button:hover,
                    .cookie-banner-disagree-button:hover,
                    .cookie-banner-agree-button:hover {
                        transform: scale(1.05); /* Slight hover effect */
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


                // Event handler for the Accept button
                window.acceptConsent = function() {
                    var categories = ${JSON.stringify(response.categories)};
                    var selectedCategories = categories.map(cat => ({ id: cat.id, name: cat.name }));

                    // Function to get cookie value by name
                    function getCookie(name) {
                        var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
                        return match ? decodeURIComponent(match[2]) : null;
                    }

                    var existingCategories = getCookie("consentCategories");

                    if (existingCategories) {
                        // If selectedCategories are already present, only save consentGiven
                        setCookie("consentGiven", "true", 365);
                    } else {
                        // If selectedCategories are not in cookies, save them
                        document.cookie = "consentCategories=" + encodeURIComponent(JSON.stringify(selectedCategories)) + "; path=/; max-age=" + (365 * 24 * 60 * 60);
                        setCookie("consentGiven", "true", 365);
                    }

                    document.body.removeChild(banner);

                    // Open the auth popup
                    openAuthPopup();

                };

                function openAuthPopup() {
                    var popup = document.createElement("div");
                    popup.innerHTML = \`
                        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                                    background: white; padding: 20px; box-shadow: 0px 0px 10px rgba(0,0,0,0.2); border-radius: 5px;">
                            <h3>Enter Email & Password</h3>
                            <input type="email" id="popupEmail" placeholder="Email" style="display: block; margin-bottom: 10px; width: 100%; padding: 5px;">
                            <input type="password" id="popupPassword" placeholder="Password" style="display: block; margin-bottom: 10px; width: 100%; padding: 5px;">
                            <button onclick="saveCredentials()">Save</button>
                        </div>
                    \`;
                    document.body.appendChild(popup);
                }

                window.saveCredentials = function() {
                    var email = document.getElementById("popupEmail").value;
                    var password = document.getElementById("popupPassword").value;

                    if (email && password) {
                        document.cookie = "userEmail=" + encodeURIComponent(email) + "; path=/; max-age=" + (365 * 24 * 60 * 60);
                        document.cookie = "userPassword=" + encodeURIComponent(password) + "; path=/; max-age=" + (365 * 24 * 60 * 60);
                        
                        document.body.lastChild.remove(); // Remove popup
                        alert("Credentials saved!");
                    } else {
                        alert("Please enter both email and password.");
                    }
                }




                // Event handlers for the Reject button
                window.rejectConsent = function() {
                    setCookie("consentGiven", "false", 365);
                    document.body.removeChild(banner);
                };




                // Open config modal
                window.openConfig = function(response) {
                    if (document.querySelector(".cookie-config-modal")) return; // Prevent multiple modals

                    var modal = document.createElement("div");
                    modal.classList.add("cookie-config-modal");

                    // Modal styling
                    modal.style.position = "fixed";
                    modal.style.top = "10vh";
                    modal.style.left = "50%";
                    modal.style.transform = "translate(-50%)";
                    modal.style.backgroundColor = "#fff";
                    modal.style.padding = "20px";
                    modal.style.borderRadius = "10px";
                    modal.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
                    modal.style.zIndex = "10001"; // Higher than the banner
                    modal.style.width = "90vh";
                    modal.style.maxWidth = "500px";
                    modal.style.maxHeight = "80vh"; // Prevents overflow
                    modal.style.overflowY = "auto";

                    // Modal content using API response data
                    modal.innerHTML = \`
                        <div class="cookie-portal-banner">


                            <!-- Header -->
                            <div class="cookie-portal-header" style="
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                padding-bottom: 15px;
                                border-bottom: 1px solid #e0e0e0;
                                position: relative;
                                text-align: left;
                            ">
                                <!-- Left Side: Icon and Text -->
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <div class="cookie-portal-icon-container" style="
                                        width: 40px;
                                        height: 40px;
                                        background: #e6f0fa;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        border-radius: 50%;
                                    ">
                                        <div class="cookie-portal-pen-icon">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 2L22 6L12 16H8V12L18 2Z" fill="#2E75B7"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <h1 class="cookie-banner-company-name" style="
                                        font-size: 18px;
                                        font-weight: bold;
                                        color: #2c3e50;
                                        margin: 0;
                                    ">
                                        Welcome to ${response.name}
                                    </h1>
                                </div>

                                <!-- Close Button (Right Side) -->
                                <button class="cookie-portal-close-button" style="
                                    position: absolute;
                                    top: 10px;
                                    right: 10px;
                                    background: none;
                                    border: none;
                                    font-size: 18px;
                                    cursor: pointer;
                                    color: #777;
                                ">✕</button>
                            </div>



                            <!-- Main Content -->

                            <div class="cookie-portal-content">
                                <p class="cookie-portal-consent-text" style="
                                    font-size: 14px;
                                    color: #333;
                                    line-height: 1.5;
                                    margin: 15px 0;
                                ">
                                    ${response.info_paragraph || "We use cookies to enhance your experience. You can manage your preferences here."}
                                </p>




                                <div class="cookie-portal-allow-section" style="
                                    display: flex;
                                    flex-direction: column;
                                    gap: 15px;
                                    padding: 10px;
                                    background: #f8f9fa;
                                    border-radius: 8px;
                                    margin-bottom: 15px;
                                ">
                                    ${response.categories.map(category => `
                                        <div class="cookie-portal-allow-item" style="display: flex; flex-direction: column; align-items: flex-start;">
                                            <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #2c3e50;">
                                                <input type="checkbox" checked data-id="${category.id}" class="cookie-category-checkbox"> ${category.name}

                                            </label>
                                            <ul style="
                                                margin-top: 5px;
                                                margin-left: 30px; /* Adjust indentation */
                                                font-size: 12px;
                                                color: #555;
                                                list-style-type: disc; /* Bulleted list */
                                                padding-left: 20px;
                                                text-align: left; /* Ensures text aligns left */
                                            ">
                                                ${category.subcategories.map(sub => `<li>${sub.name}</li>`).join('')}
                                            </ul>
                                        </div>
                                    `).join('')}
                                </div>



                                <p class="cookie-portal-consent-text" style="
                                    font-size: 14px;
                                    color: #333;
                                    line-height: 1.5;
                                    margin: 15px 0;
                                ">
                                    ${response.info_paragraph || "We use cookies to enhance your experience. You can manage your preferences here."}
                                </p>
                            </div>


                            <div class="cookie-portal-footer" style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                padding: 10px 15px;
                                border-top: 1px solid #e0e0e0;
                                background: #f8f9fa;
                            ">
                                <!-- SVG Logo on the left -->
                                <div class="cookie-portal-logo-container" style="
                                    display: flex;
                                    align-items: center;
                                ">
                                    <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="100" height="30" rx="5" fill="#2e75b7"/>
                                        <text x="50%" y="50%" text-anchor="middle" dy=".35em" fill="white" font-size="14" font-family="Arial, sans-serif">Your Logo</text>
                                    </svg>
                                </div>



                                <!-- Save button with text below -->
                                <div class="cookie-portal-save-container" style="
                                    text-align: center;
                                ">
                                    <button class="cookie-portal-save-button" style="
                                        background: #2e75b7;
                                        color: white;
                                        border: none;
                                        padding: 8px 15px;
                                        border-radius: 4px;
                                        font-size: 14px;
                                        cursor: pointer;
                                        font-weight: 500;
                                    ">Save</button>
                                    <p class="cookie-portal-save-text" style="
                                        font-size: 12px;
                                        color: #666;
                                        margin-top: 5px;
                                    ">Set all your preferences to save and continue</p>
                                </div>
                            </div>

                            
                        </div>
                    \`;

                    // Close modal event
                    modal.querySelector(".cookie-portal-close-button").addEventListener("click", closeConfig);

                    // Append modal to body
                    document.body.appendChild(modal);

                    // Save button event
                    modal.querySelector(".cookie-portal-save-button").addEventListener("click", function() {
                        var selectedCategories = [];
                        document.querySelectorAll(".cookie-category-checkbox:checked").forEach(checkbox => {
                            selectedCategories.push({
                                id: checkbox.getAttribute("data-id"),
                                name: checkbox.parentElement.textContent.trim()
                            });
                        });

                        // Store selected categories in a cookie
                        document.cookie = "selectedCategories=" + encodeURIComponent(JSON.stringify(selectedCategories)) + "; path=/; max-age=31536000"; // 1 year expiration

                        // Close modal after saving
                        closeConfig();
                    });

                };

                // Close config modal
                window.closeConfig = function() {
                    var modal = document.querySelector(".cookie-config-modal");
                    if (modal) {
                        modal.remove();
                    }
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
