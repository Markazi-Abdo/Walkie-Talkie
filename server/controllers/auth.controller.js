import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/Token.js";
import { dbLogger } from "../logs/functions/db.log.js";
import { httpLogger } from "../logs/functions/http.log.js";
import { serverLogger } from "../logs/functions/server.log.js";
import User from "../model/user.model.js";
import bcrypt from 'bcryptjs'

export const signUpController = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        if(!email || !username || !password){
            dbLogger.info('Couldn t create user due missing fields');
            return res.status(400).json({message: 'All fields are mandatory', success: false});
        }
        if(password.length < 6) {
            dbLogger.info('Couldn t proceed due to short password length, user is prompted to lengthen it');
            return res.status(400).json({message:'Password should be longer than 6 characters', success: false});
        };

        //Making sure the email isunique and not re-used
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message:'Email Already exists', success: true})
        }
        
        //Hashing the password with salt
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //Creating the user
        const newUser = new User({
            username: username,
            password: hashPassword,
            email: email
        })

        if(newUser){
            generateToken(newUser._id, res)
            //Saving into database
            await newUser.save();
            dbLogger.info(`Succesfully created ${newUser.username}`);
            return res.status(201).json({ success: true, message: 'Succesfully created user', data: newUser});

        }else{
            dbLogger.info('Inserion failed');
            return res.status(400).json({success: false, message: 'Insertion Failed'});
        }

    } catch (error) {
        dbLogger.info('Error code 500, inserion failed');
        return res.status(500).json({ success: false, message: 'Inserion failed, error code 500'});
    }
}

export const loginController = async (req, res) => {
    httpLogger.info('LogIn page was accessed');
    const { email, password } = req.body;
     try {
        const user = await User.findOne({email});
        if(!user){
            dbLogger.info('Couldn t proceed due to invalid creadenatials');
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const pass = await bcrypt.compare(password, user.password);
        if(!pass){
            dbLogger.info('Couldnt proceed due invalid credentials');
            return res.status(400).json({message: 'LogIn Failed', success: false})
        }

        generateToken(user._id, res);
        return res.status(201).json({message: 'Login Succesful', success: true, user:{
            _id: user._id,
            email: user.email,
            username: user.username
        }})

     } catch (error) {
        dbLogger.info(error);
        return res.status(500).json({message: error.message, success: false})
     }
}

export const logoutController = async (req, res) => {
    try {
        res.cookie("token_key", "", {maxAge: 0});
        serverLogger.info('LoggedOut Succefully');
        return res.status(200).json({message: 'User logout Succesfully', success: true});
    } catch (error) {
        serverLogger(error.message);
        return res.status(500).json({message: 'Logout Unsuccesfull', success: false});
    }
}

export const updateProfile = async (req, res) => {
    try{
        const { profilePic } = req.body;
        const user = req.user._id;
        
        if(!profilePic){
            serverLogger.info('Profile Pic wasnt read....');
            return res.status(400).json({success: false, message:'Profile Pic Required'});
        }

        const pic = await cloudinary.uploader.upload(profilePic);
        const update = await User.findByIdAndUpdate(user,{ profilePic: pic.secure_url },{ new: true })

        dbLogger.info(`${req.user.username} updated his profile pic ${update}`);
        return res.status(201).json({ success: true, message: `${req.user.username} updated his profile pic`});
    }catch (error){
        serverLogger.info(error.message);
        return res.status(500).json({success: false, message:'Update Failed'});
    }
}

export const checkAuth = (req, res)=>{
    try {
        return res.status(200).json({ success: true, message: 'User authentic', userData: req.user});
    } catch (error) {
        serverLogger.info(error.message);
        return res.status(500).json({ success: false, message: 'User authentification Failed'});
    }
}
