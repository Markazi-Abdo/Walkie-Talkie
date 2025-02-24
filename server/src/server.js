import express from 'express'
import { serverLogger } from '../logs/functions/server.log.js';
import dotenv from 'dotenv'
import morgan from 'morgan'
import authRoutes from '../routes/auth.routes.js'
import { connectToDatabase } from '../lib/db.js';
import cors from 'cors'
import Messages from '../model/message.model.js';
import cookieParser from 'cookie-parser'
import messageRoutes from '../routes/message.routes.js';
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
//For Http Logs
app.use(
    morgan('combined',{
        stream:{
            write: (message) => serverLogger.info(message.trim())
        }
    })
)

app.use('/walkietalkie/auth', authRoutes);
app.use('/walkietalkie/message', messageRoutes);

dotenv.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    serverLogger.info(`Server running on port ${PORT}`);
    connectToDatabase(process.env.MONGO_DB_URI)
})

