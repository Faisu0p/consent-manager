import sql from "mssql";
import connectDB from "../config/db.js";

const consentUserapiModel = {
    // ✅ Get users who gave consent
    async getUsersWithConsent() {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.request().query(`
            SELECT DISTINCT cu.*
            FROM consent_users cu
            INNER JOIN consents c ON cu.id = c.consent_user_id
            WHERE c.given = 1
        `);

        return result.recordset;
    },

    // ✅ Get users who did not give consent
    async getUsersWithoutConsent() {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.request().query(`
            SELECT cu.*
            FROM consent_users cu
            WHERE cu.id NOT IN (
                SELECT consent_user_id FROM consents WHERE given = 1
            )
        `);

        return result.recordset;
    }
};

export default consentUserapiModel;
