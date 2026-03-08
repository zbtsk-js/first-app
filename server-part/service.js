import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from "./routers/Router.js";
import dotenv from 'dotenv';


dotenv.config();

const app = express();

// Если деплой, отключаем localhost CORS
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API роуты
app.use('/auth', router);

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