import express from 'express'
import { autheUser } from '../middleware/auth.middleware.js';
import { getMessages, sendMessage, sideUsers } from '../controllers/messages.controller.js';
const messageRoutes = express.Router();

messageRoutes.get('/users', autheUser, sideUsers);
messageRoutes.get('/:id', autheUser, getMessages);
messageRoutes.post('/send/:id', autheUser, sendMessage);

export default messageRoutes;