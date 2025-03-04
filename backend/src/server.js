import express from 'express';
import cors from 'cors';
import userRoute from './routes/userRoutes.js';
import accessLogRoute from './routes/accessLogRoutes.js';
import bannerTemplateRoute from './routes/bannerTemplateRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes for users
app.use('/api/users', userRoute);

// Routes for access logs
app.use("/api/access-logs", accessLogRoute);

// Routes for banner templates
app.use('/api/banner-templates', bannerTemplateRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
