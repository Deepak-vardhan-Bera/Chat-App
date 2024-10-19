import express from 'express'
import dotenv from 'dotenv'


import authRouter from './routes/authRouter.routes.js'
import messageRouter from './routes/message.router.js'
import userRouter from './routes/user.router.js'

import { connectDB } from './Db/ConnectDb.js';


import cookieParser from 'cookie-parser';




const app=express();
dotenv.config()
const PORT=process.env.PORT||9000
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',userRouter)

app.listen(PORT,()=>{
    connectDB()
    console.log("PORT Running On ",PORT);
    
})