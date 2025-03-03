import express from "express";
import { body } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";
import userController from "../controllers/userController.js";

const router = express.Router();

// Register User Route
router.post(
    "/register",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
        body("role_id").isInt().withMessage("Valid role_id is required")
    ],
    userController.registerUser
);

// Login User Route
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").notEmpty().withMessage("Password is required")
    ],
    userController.loginUser
);

// Only Admins can access this route
router.post("/create", authMiddleware(["Admin"]), userController.createUser);

// Only Admins can access this route
router.delete("/delete/:userId", authMiddleware(["Admin"]), userController.deleteUser);


export default router;
