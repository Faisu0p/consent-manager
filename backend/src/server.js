import express from "express";
import cors from "cors";
import { config } from "./config/env.js";
import userRoute from "./routes/userRoutes.js";
import accessLogRoute from "./routes/accessLogRoutes.js";
import bannerTemplateRoute from "./routes/bannerTemplateRoutes.js";
import scriptRoute from "./routes/scriptRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes for users
app.use("/api/users", userRoute);

// Routes for access logs
app.use("/api/access-logs", accessLogRoute);

// Routes for banner templates
app.use("/api/banner-templates", bannerTemplateRoute);

// Routes for scripts
app.use("/api", scriptRoute);

const PORT = config.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
