import jwt from 'jsonwebtoken'
import { serverLogger } from '../logs/functions/server.log.js';
import User from '../model/user.model.js';

export const autheUser = async (req, res, next) => {
    try {
        serverLogger.info('Authentification started')
        //Getting the token for the url and validating it
        const token = req.cookies.token_key;
        if(!token){
            serverLogger.info('Unathaurized, token was missing');
            return res.status(401).json({message: 'Unathaurized, token was missing', success: false});
        }

        //Verfiying and validation again
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        if(!decoded){
            serverLogger.info('Unathaurized, token was invalid');
            return res.status(401).json({message: 'Unathaurized, token was invalid', success: false});
        }

        //Now searching in the database for authentification purposes
        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            serverLogger.info('Unathaurized, user credentials invalid');
            return res.status(401).json({message: 'Unathaurized, user credentials invalid', success: false});
        }

        //Fill in the user and calling the next function()
        req.user = user;
        next();
        
    } catch (error) {
        serverLogger.info(error.message);
        return res.status(500).json({message: error.message, success: false});
    }
}