import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import router from "./routers/Router.js";
import dotenv from 'dotenv'
import errorMiddleware from "./Middlewares/error-middleware.js";
dotenv.config()
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/auth', router)
app.use(errorMiddleware)
async function main(){

try{
    await mongoose.connect(process.env.DB_URL);
    app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
}catch(e){console.log(e)}

}
main()