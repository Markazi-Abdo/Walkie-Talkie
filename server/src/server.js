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
import http from 'http';
import { Server } from 'socket.io';
import { dbLogger } from '../logs/functions/db.log.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin: "http://localhost:5173",
        credentials: true, 
    }
});

const PORT = process.env.PORT || 8000;

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

export const serverNamespace = io.of("/walkietalkie");
const connectedUsers = {};
export const getReceiverId = (userId) => {
    return connectedUsers[userId];
}

serverNamespace.on('connection', (socket) => {
    serverLogger.info(" 🐵🐵🐵 User Connected ");
    serverLogger.info(`Id: ${ socket.id }`);

    const connectionId = socket.handshake.query.userId;
    if(connectionId) connectedUsers[connectionId] = socket.id;

    serverNamespace.emit("onlineUsers", Object.keys(connectedUsers));
    dbLogger.info(`Online Users : ${JSON.stringify(connectedUsers)}`);

    socket.on("disconnect" , () => {
        serverLogger.info("User Disconnected");
        serverLogger.info(socket.id)
        delete connectedUsers[connectionId];
        io.emit("onlineUsers", Object.keys(connectedUsers));
        dbLogger.info(`Online Users : ${JSON.stringify(connectedUsers)}`);
    })
})

server.listen(PORT, ()=>{
    serverLogger.info(`Server running on port ${PORT}`);
    connectToDatabase(process.env.MONGO_DB_URI)
})


