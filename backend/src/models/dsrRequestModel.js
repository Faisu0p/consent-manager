import sql from "mssql";
import connectDB from "../config/db.js";

const dsrRequestModel = {
    // Create a new DSR request
    async createDSRRequest({ user_id, request_type, reason }) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.request()
            .input("user_id", sql.Int, user_id)
            .input("request_type", sql.VarChar, request_type)
            .input("reason", sql.NVarChar, reason)
            .query(`
                INSERT INTO dsr_requests (user_id, request_type, reason)
                VALUES (@user_id, @request_type, @reason);
                SELECT SCOPE_IDENTITY() AS id;
            `);

        return result.recordset[0];
    },

    // Get all DSR requests
    async getAllDSRRequests() {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.request().query(`
            SELECT dr.*, cu.email, cu.username
            FROM dsr_requests dr
            JOIN consent_users cu ON dr.user_id = cu.id
            ORDER BY dr.created_at DESC;
        `);

        return result.recordset;
    },

    // Get a DSR request by ID
    async getDSRRequestById(id) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool.request()
            .input("id", sql.Int, id)
            .query(`
                SELECT dr.*, cu.email, cu.username
                FROM dsr_requests dr
                JOIN consent_users cu ON dr.user_id = cu.id
                WHERE dr.id = @id;
            `);

        return result.recordset[0];
    }
};

export default dsrRequestModel;
