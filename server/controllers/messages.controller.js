import cloudinary from "../lib/cloudinary.js";
import { dbLogger } from "../logs/functions/db.log.js";
import { serverLogger } from "../logs/functions/server.log.js";
import Messages from "../model/message.model.js";
import User from "../model/user.model.js";
import { getReceiverId, serverNamespace } from "../src/server.js";

export const sideUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const users = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        serverLogger.info('Getting users to client');

        if(!users){
            serverLogger.info('Couldn t retrieve users');
            return res.status(400).json({ success: false, message: "Couldn't get users"});
        }

        serverLogger.info('Got all users'  + users);
        res.status(200).json({ success: true, message: "Users listed", data: users });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatWith } = req.params;
        const myId = req.user._id || "";
    
        const messages = await Messages.find({
            $or:[
                {senderId: myId, receiverId: userToChatWith},
                {senderId: userToChatWith, receiverId: myId}
            ]
        });
        
        !messages && res.status(400).json({ success: false, message: "Couldn't get messages" });

        dbLogger.info("Got Messages" + messages || "Nothing");
        res.status(200).json({ success: true, message: "Got messages Succesfully", messagesData: messages});
        
    } catch (error) {
        dbLogger.info(error.message)
        return res.status(500).json({ success: false, message: "Couldn't get messages"});
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { id:receiverId } = req.params;
        const { text, image } = req.body;
        const mySenderId = req.user._id;
        let imageUrl;
    
        if(image){
            const upload = await cloudinary.uploader.upload(image);
            imageUrl = upload.secure_url;
        }
    
        const message = new Messages({
            senderId: mySenderId,
            receiverId: receiverId,
            text,
            image: imageUrl
        })
    
        const savedMessage = await message.save();
        //TODO: Socket functionality goes here....
        const receiver = getReceiverId(receiverId);
        if(receiver){
            serverNamespace.to(receiver).emit("newMessage", savedMessage);
        }
        serverLogger.info(`${savedMessage} in chat`);
        dbLogger.info(`saved Messsage: ${savedMessage}`);
        res.status(201).json({ success: true, messageData: savedMessage, message: "Inserted Succesfully"});
        
    } catch (error) {
        serverLogger.info(error.message);
        res.status(500).json({ success: false, message: error.message});
    }
}