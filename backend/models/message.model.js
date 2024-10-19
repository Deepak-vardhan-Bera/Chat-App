import mongoose from "mongoose";
import getISTTime from "../utils/getISTTime.utils.js";

const Schema= new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},
{
    timestamps:{currentTime:getISTTime}
}
)

const Message=mongoose.model("Message",Schema)
export default Message