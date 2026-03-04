import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from "./routers/Router.js";
import dotenv from 'dotenv';
import errorMiddleware from "./Middlewares/error-middleware.js";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Если деплой, отключаем localhost CORS
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API роуты
app.use('/auth', router);

// Обработка ошибок
app.use(errorMiddleware);

// --- Отдаём фронт React ---
app.use(express.static(path.join(__dirname, '../frontend-part/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend-part/dist', 'index.html'));
});

// Подключение к MongoDB и запуск сервера
async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

main();