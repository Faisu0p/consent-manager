import jwt from "jsonwebtoken";

const authMiddleware = (requiredRoles = []) => {
    return (req, res, next) => {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        try {
            const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
            req.user = decoded; // Attach user info to request

            // Check if user has the required role
            if (requiredRoles.length > 0 && !requiredRoles.includes(req.user.role)) {
                return res.status(403).json({ error: "Access denied. Insufficient permissions." });
            }

            next();
        } catch (err) {
            return res.status(400).json({ error: "Invalid token." });
        }
    };
};

export default authMiddleware;
