import sql from "mssql";
import connectDB from "../config/db.js";

const bannerTemplateModel = {

    // Create a new banner template
    async createBannerTemplate(name, mainText, infoParagraph, headerText, buttonAcceptText, buttonRejectText, buttonConfigureText) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("name", sql.VarChar, name)
            .input("main_text", sql.Text, mainText)
            .input("info_paragraph", sql.Text, infoParagraph)
            .input("header_text", sql.Text, headerText)
            .input("button_accept_text", sql.VarChar, buttonAcceptText)
            .input("button_reject_text", sql.VarChar, buttonRejectText)
            .input("button_configure_text", sql.VarChar, buttonConfigureText)
            .query(`
                INSERT INTO banner_templates (name, main_text, info_paragraph, header_text, button_accept_text, button_reject_text, button_configure_text) 
                OUTPUT INSERTED.id
                VALUES (@name, @main_text, @info_paragraph, @header_text, @button_accept_text, @button_reject_text, @button_configure_text)
            `);

        return result.recordset[0].id;
    },

    // Create a new consent portal
    async createConsentPortal(templateId, upperText, lowerText) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");
    
        const result = await pool
            .request()
            .input("template_id", sql.Int, templateId)
            .input("upper_text", sql.Text, upperText)
            .input("lower_text", sql.Text, lowerText)
            .query(`
                INSERT INTO consent_portal (template_id, upper_text, lower_text) 
                OUTPUT INSERTED.id
                VALUES (@template_id, @upper_text, @lower_text)
            `);
    
        return result.recordset[0].id;
    },
    

    // Create a new consent category
    async createConsentCategory(templateId, name, description, isRequired) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("template_id", sql.Int, templateId)
            .input("name", sql.VarChar, name)
            .input("description", sql.Text, description)
            .input("is_required", sql.Bit, isRequired)
            .query(`
                INSERT INTO consent_categories (template_id, name, description, is_required) 
                OUTPUT INSERTED.id
                VALUES (@template_id, @name, @description, @is_required)
            `);

        return result.recordset[0].id;
    },

    // Create a new consent subcategory
    async createConsentSubcategory(categoryId, name, description) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("category_id", sql.Int, categoryId)
            .input("name", sql.VarChar, name)
            .input("description", sql.Text, description)
            .query(`
                INSERT INTO consent_subcategories (category_id, name, description) 
                OUTPUT INSERTED.id
                VALUES (@category_id, @name, @description)
            `);

        return result.recordset[0].id;
    },

    // Create a new partner
    async createPartner(templateId, name, isBlocked) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("template_id", sql.Int, templateId)
            .input("name", sql.VarChar, name)
            .input("is_blocked", sql.Bit, isBlocked)
            .query(`
                INSERT INTO partners (template_id, name, is_blocked) 
                OUTPUT INSERTED.id
                VALUES (@template_id, @name, @is_blocked)
            `);

        return result.recordset[0].id;
    },


    // Get all banner templates
    async getAllBannerTemplates() {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.query("SELECT * FROM banner_templates");

        return result.recordset;
    },


    // Get a specific consent portal by template ID
    async getConsentPortalByTemplateId(templateId) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");
    
        const result = await pool
            .request()
            .input("template_id", sql.Int, templateId)
            .query("SELECT * FROM consent_portal WHERE template_id = @template_id");
    
        return result.recordset;
    },
    

    // Get all consent categories for a specific template
    async getConsentCategories(templateId) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("template_id", sql.Int, templateId)
            .query("SELECT * FROM consent_categories WHERE template_id = @template_id");

        return result.recordset;
    },

    // Get all consent subcategories for a specific category
    async getConsentSubcategories(categoryId) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("category_id", sql.Int, categoryId)
            .query("SELECT * FROM consent_subcategories WHERE category_id = @category_id");

        return result.recordset;
    },

    // Get all partners for a specific template
    async getPartners(templateId) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("template_id", sql.Int, templateId)
            .query("SELECT * FROM partners WHERE template_id = @template_id");

        return result.recordset;
    },

    // All Banner Templates
    async getAllBannerTemplates() {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.query("SELECT * FROM banner_templates");
        return result.recordset;
    },

    // All Consent Portals
    async getAllConsentPortals() {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.query("SELECT * FROM consent_portal");
        return result.recordset;
    },

    // All Consent Categories
    async getAllConsentCategories() {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.query("SELECT * FROM consent_categories");
        return result.recordset;
    },

    // All Consent Subcategories
    async getAllConsentSubcategories() {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.query("SELECT * FROM consent_subcategories");
        return result.recordset;
    },

    // All Partners
    async getAllPartners() {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.query("SELECT * FROM partners");
        return result.recordset;
    }

};

export default bannerTemplateModel;
