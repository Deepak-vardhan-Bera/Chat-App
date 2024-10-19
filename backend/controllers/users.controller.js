import { User } from "../models/user.model.js";


export const getUsersForSidebar=async(req,res)=>{


try {
    const users=await User.find({ _id: {$ne:req.userId } }).select("-password")
    // console.log(users);
    
    res.status(200).json({
        success: true,
       users
      });
} catch (error) {
    console.log(error);
    res.status(500).json({error,message:"Error at Geting users"})
}
}