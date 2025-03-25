import sql from "mssql";
import connectDB from "../config/db.js";

const viewConsentModel = {
    // Get all user consents with merged categories
    async getAllConsents() {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .query(`
                SELECT 
                    c.id AS consent_id,
                    cu.id AS user_id,
                    cu.email AS user_email,  
                    bt.name AS template_name,   
                    COALESCE(STRING_AGG(cc.name, ', '), 'No Consent Given') AS category_names, 
                    c.given AS consent_status,  
                    c.timestamp AS consent_date
                FROM consents c
                JOIN consent_users cu ON c.consent_user_id = cu.id
                LEFT JOIN consent_selected_categories csc ON c.id = csc.consent_id  
                LEFT JOIN consent_categories cc ON csc.category_id = cc.id  
                LEFT JOIN banner_templates bt ON cc.template_id = bt.id  
                GROUP BY c.id, cu.id, cu.email, bt.name, c.given, c.timestamp
                ORDER BY c.timestamp DESC;
            `);

        return result.recordset;
    },

    // Get user consents by user ID
    async getUserConsents(userId) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("user_id", sql.Int, userId)
            .query(`
                SELECT 
                    c.id AS consent_id,
                    cu.id AS user_id,
                    cu.email AS user_email,  
                    bt.name AS template_name,   
                    COALESCE(STRING_AGG(cc.name, ', '), 'No Consent Given') AS category_names, 
                    COALESCE(
                        STRING_AGG(CONCAT(cc.name, ': ', cs.name), '; '), 
                        'No Subcategories'
                    ) AS category_subcategory_mapping,
                    COALESCE(STRING_AGG(p.name, ', '), 'No Partners') AS partner_names,
                    c.given AS consent_status,  
                    c.timestamp AS consent_date
                FROM consents c
                JOIN consent_users cu ON c.consent_user_id = cu.id
                LEFT JOIN consent_selected_categories csc ON c.id = csc.consent_id  
                LEFT JOIN consent_categories cc ON csc.category_id = cc.id  
                LEFT JOIN consent_subcategories cs ON cc.id = cs.category_id  
                LEFT JOIN banner_templates bt ON cc.template_id = bt.id  
                LEFT JOIN partners p ON bt.id = p.template_id
                WHERE cu.id = @user_id
                GROUP BY c.id, cu.id, cu.email, bt.name, c.given, c.timestamp
                ORDER BY c.timestamp DESC;
            `);

        return result.recordset;
    }

};

export default viewConsentModel;
