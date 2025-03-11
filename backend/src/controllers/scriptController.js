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

      // Fetch the full template details using model functions directly
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
              var banner = document.createElement("div");
              banner.style.position = "fixed";
              banner.style.bottom = "0";
              banner.style.width = "100%";
              banner.style.backgroundColor = "black";
              banner.style.color = "white";
              banner.style.padding = "10px";
              banner.style.textAlign = "center";

              banner.innerHTML = \`
                  <h3>${response.header_text}</h3>
                  <p>${response.main_text}</p>
                  <button onclick="acceptConsent()"> ${response.button_accept_text} </button>
                  <button onclick="rejectConsent()"> ${response.button_reject_text} </button>
                  <button onclick="openConfig()"> ${response.button_configure_text} </button>
              \`;

              document.body.appendChild(banner);

              window.acceptConsent = function() {
                  document.body.removeChild(banner);
                  localStorage.setItem("consentGiven", "true");
              };

              window.rejectConsent = function() {
                  document.body.removeChild(banner);
                  localStorage.setItem("consentGiven", "false");
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
