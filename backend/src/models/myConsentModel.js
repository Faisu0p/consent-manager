import sql from "mssql";
import connectDB from "../config/db.js";

const myConsentModel = {
    // Fetch User's Email
    async getUserEmail(userId) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("user_id", sql.Int, userId)
            .query(`
                SELECT email
                FROM consent_users
                WHERE id = @user_id;
            `);

        return result.recordset;
    },

    // Check If Consent is Given
    async checkConsentGiven(userId) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("user_id", sql.Int, userId)
            .query(`
                SELECT CASE 
                        WHEN EXISTS (SELECT 1 FROM consent_selected_categories WHERE consent_id = @user_id) 
                        THEN 'Yes' 
                        ELSE 'No' 
                      END AS consent_given;
            `);

        return result.recordset;
    },

    // Fetch Template Name
    async getTemplateName(userId) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("user_id", sql.Int, userId)
            .query(`
                SELECT DISTINCT bt.name AS template_name
                FROM consent_selected_categories csc
                JOIN consent_categories cc ON csc.category_id = cc.id
                JOIN banner_templates bt ON cc.template_id = bt.id
                WHERE csc.consent_id = @user_id;
            `);

        return result.recordset;
    },

    // Fetch All Category Names, IDs, Description, and 'Is Required' for the Template (All Categories, Not Selected Ones)
    async getAllCategoriesForTemplate(userId) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("user_id", sql.Int, userId)
            .query(`
                SELECT DISTINCT cc.id AS category_id, 
                                cc.name AS category_name, 
                                cc.description AS category_description, 
                                cc.is_required
                FROM consent_categories cc
                WHERE cc.template_id IN (
                    SELECT DISTINCT cc.template_id
                    FROM consent_selected_categories csc
                    JOIN consent_categories cc ON csc.category_id = cc.id
                    WHERE csc.consent_id = @user_id
                );
            `);

        return result.recordset;
    },

    // Fetch Category IDs, Subcategory Names, IDs, and Subcategory Descriptions
    async getSubcategoriesByCategory(userId) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("user_id", sql.Int, userId)
            .query(`
                SELECT DISTINCT cc.id AS category_id, 
                                sc.id AS subcategory_id, 
                                sc.name AS subcategory_name, 
                                sc.description AS subcategory_description
                FROM consent_categories cc
                JOIN consent_subcategories sc ON cc.id = sc.category_id
                WHERE cc.id IN (SELECT category_id FROM consent_selected_categories WHERE consent_id = @user_id);
            `);

        return result.recordset;
    },

    // Fetch Selected Categories (IDs)
    async getSelectedCategories(userId) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("user_id", sql.Int, userId)
            .query(`
                SELECT DISTINCT category_id
                FROM consent_selected_categories
                WHERE consent_id = @user_id;
            `);

        return result.recordset;
    }
};

export default myConsentModel;
