import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRouter from "./routers/AuthRouter.js";
import PaymentRouter from "./routers/PaymentRouter.js";
import OrderRouter from "./routers/OrderRouter.js";
import EmailRouter from "./routers/EmailRouter.js";
import dotenv from 'dotenv';
import errorMiddleware from './Middlewares/error-middleware.js';

dotenv.config();

const app = express();

// Если деплой, отключаем localhost CORS
app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', AuthRouter);
app.use('/payment', PaymentRouter)
app.use('/order', OrderRouter)
app.use('/emails', EmailRouter)
app.use(errorMiddleware)

// Подключение к MongoDB и запуск сервера
async function main() {
    const PORT = process.env.PORT || 5000;
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("MongoDB connection error:", e);
    }
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
main();