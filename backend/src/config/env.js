import dotenv from "dotenv";
dotenv.config();

export const config = {
  DB_USER: process.env.DB_USER || "Faisu",
  DB_PASSWORD: process.env.DB_PASSWORD || "faisu786",
  DB_SERVER: process.env.DB_SERVER || "LAPTOP-EFNG08R9\\SQLEXPRESS",
  DB_DATABASE: process.env.DB_DATABASE || "Consent_Manager",
  DB_PORT: process.env.DB_PORT || 1433,
  DB_ENCRYPT: process.env.DB_ENCRYPT === "true",
  JWT_SECRET: process.env.JWT_SECRET || "f1e2d3c4b5a6e7f8901234567890abcdef1234567890abcdef1234567890abcd",
};
