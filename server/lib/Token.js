import jwt from 'jsonwebtoken'
import { serverLogger } from '../logs/functions/server.log.js';

//Function to generate Token
export const generateToken = (userId, res)=> {
    //Function to generate token
    //User id, token secret key in .env, expiration date
    const token = jwt.sign({ userId }, process.env.TOKEN_KEY, { expiresIn: '30d' });
    //Sending it back thru cookies
    res.cookie("token_key", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development' ? true : false
    });

    serverLogger.info('Generated Token');
    return token;
}