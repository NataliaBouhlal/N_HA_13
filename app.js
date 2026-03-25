import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/index.js';
import publisherRoutes from './routes/publisherRoutes.js';
import magazineRoutes from './routes/magazineRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/publishers', publisherRoutes);
app.use('/magazines', magazineRoutes);
app.use('/tags', tagRoutes);
app.use('/articles', articleRoutes);

// запуск сервера
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Server startup error:', error);
    }
});