import express from 'express'
import { checkAuth, loginController, logoutController, signUpController, updateProfile } from '../controllers/auth.controller.js';
import { autheUser } from '../middleware/auth.middleware.js';

const authRoutes = express.Router();

authRoutes.post('/signup', signUpController)

authRoutes.post('/login', loginController)

authRoutes.post('/logout', logoutController)

authRoutes.put('/update_profile', autheUser,  updateProfile);

authRoutes.get('/check', autheUser, checkAuth);

export default authRoutes;