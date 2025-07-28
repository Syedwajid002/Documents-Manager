import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/dbconfig';
import authRoutes from './routes/authRoutes';
import DataRoutes from './routes/DataRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(cookieParser());

connectDB().then(() => {
    app.use('/api/auth', authRoutes);
    app.use('/getData', DataRoutes);

    app.get('/', (req, res) => {
        res.send('API is running...');
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error: any) => {
    console.error('Failed to start server due to DB connection error:', error);
    process.exit(1);
});
