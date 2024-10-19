import mongoose from "mongoose";
import getISTTime from "../utils/getISTTime.utils.js";

const conversationSchema= new mongoose.Schema({
    partcipants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[],
        },

    ],
    
},
{
    timestamps:{currentTime:getISTTime}
}
)

const Conversation=mongoose.model('Conversation',conversationSchema)

export default Conversation