import mongoose from 'mongoose'
//Message Collection Format
const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    text:{
        type:String
    },
    image:{
        type:String
    }

},{ timestamps: true });

const Messages = mongoose.model("Message", messageSchema);
export default Messages;
