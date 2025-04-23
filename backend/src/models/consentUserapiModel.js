import sql from "mssql";
import connectDB from "../config/db.js";

const consentUserapiModel = {



    //Api's for User Details 

    // ✅ Get all users details
    async getAllUsers() {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");
    
        const result = await pool.request().query(`
            SELECT id, email, username, phone FROM consent_users
        `);
    
        return result.recordset;
    },

    // ✅ Get user details by email
    async getUserByEmail(email) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.request()
            .input("email", sql.NVarChar, email)
            .query(`
                SELECT id, email, username, phone
                FROM consent_users
                WHERE email = @email
            `);

        return result.recordset[0] || null;
    },

    // ✅ Get user details by phone number
    async getUserByPhone(phone) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.request()
            .input("phone", sql.NVarChar, phone)
            .query(`
                SELECT id, email, username, phone
                FROM consent_users
                WHERE phone = @phone
            `);

        return result.recordset[0] || null;
    },

    // ✅ Get user details by ID
    async getUserById(id) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.request()
            .input("id", sql.Int, id)
            .query(`
                SELECT id, email, username, phone
                FROM consent_users
                WHERE id = @id
            `);

        return result.recordset[0] || null;
    },

    // ✅ Get user details by username
    async getUserByUsername(username) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.request()
            .input("username", sql.NVarChar, username)
            .query(`
                SELECT id, email, username, phone
                FROM consent_users
                WHERE username = @username
            `);

        return result.recordset[0] || null;
    },
    










    
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
