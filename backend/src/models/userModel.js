import sql from "mssql";
import connectDB from "../config/db.js";

const userModel = {
    async createUser(username, email, hashedPassword) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("username", sql.VarChar, username)
            .input("email", sql.VarChar, email)
            .input("password_hash", sql.VarChar, hashedPassword)
            .query(
                "INSERT INTO users (username, email, password_hash) OUTPUT INSERTED.id VALUES (@username, @email, @password_hash)"
            );

        return result.recordset[0].id;
    },

    async assignRole(userId, roleId) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        await pool
            .request()
            .input("user_id", sql.Int, userId)
            .input("role_id", sql.Int, roleId)
            .query("INSERT INTO user_roles (user_id, role_id) VALUES (@user_id, @role_id)");
    },

    async findUserByEmail(email) {
        const pool = await connectDB();
        if (!pool) throw new Error("Database connection failed");

        const result = await pool
            .request()
            .input("email", sql.VarChar, email)
            .query(`
                SELECT u.id, u.email, u.password_hash, r.role_name 
                FROM users u 
                JOIN user_roles ur ON u.id = ur.user_id 
                JOIN roles r ON ur.role_id = r.id 
                WHERE u.email = @email
            `);

        return result.recordset[0];
    }
    
};

export default userModel;
