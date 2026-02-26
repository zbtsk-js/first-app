import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import router from "./routers/Router.js";
import dotenv from 'dotenv'
import errorMiddleware from "./Middlewares/error-middleware.js";
dotenv.config()
const Port = process.env.PORT || 3000  ;
const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use('/auth', router)
app.use(errorMiddleware)
async function main(){

try{
    await mongoose.connect(process.env.DB_URL);
    app.listen(Port, () => console.log('Server is running on port 3000'))
}catch(e){console.log(e)}

}
main()