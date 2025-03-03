import express from 'express';
import cors from 'cors';
import userRoute from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes for users
app.use('/api/users', userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
