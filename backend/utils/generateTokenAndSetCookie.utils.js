import jwt from "jsonwebtoken"



export const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("token",token,{
        httpOnly:true,
       secure:process.env.NODE_ENV==="production",
       sameSite:"none",
       maxAge:7000*24*60*60*1000
    })
    return token;
}

export default generateTokenAndSetCookie