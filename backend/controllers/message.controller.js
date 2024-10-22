import Message from "../models/message.model.js";
import { User } from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const sendMessage=async(req,res)=>{
const {message}= req.body
const senderId=req.userId
const receiverId=req.params.id
let conversation;
try {
   conversation= await Conversation.findOne({
        partcipants:{$all :[senderId,receiverId]}
    })
    
    if(!conversation){
        conversation=await Conversation.create({
            partcipants:[senderId,receiverId]
        })
    }
    
    const newMessage=new Message({
        senderId,
        receiverId,
        message
    })

    if(newMessage){
        conversation.messages.push(newMessage._id)
    }
    await Promise.all([conversation.save(),newMessage.save()])
    const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
    res.status(201).json(newMessage)
} catch (error) {
    console.log(error);
    res.status(500).json({error,message:"Error at saving messages"})
}
}


export const getMessages = async(req,res)=>{
const {id:chatWithId}=req.params
const senderId=req.userId

try {
    const conversation=await Conversation.findOne({
        partcipants:{ $all:[senderId,chatWithId]}
    }).populate('messages')
// console.log(conversation);
if (!conversation) {
    return res.status(200).json([]);
  }
  const messages=await conversation.messages
    res.status(200).json(messages)
} catch (error) {
    console.log(error);
    res.status(500).json({error,message:"Error at Geting messages"})
}
}