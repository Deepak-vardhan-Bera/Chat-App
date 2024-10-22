import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from 'url';

import authRouter from './routes/authRouter.routes.js'
import messageRouter from './routes/message.router.js'
import userRouter from './routes/user.router.js'

import { connectDB } from './Db/ConnectDb.js';

import { app,server } from './socket/socket.js'


import cookieParser from 'cookie-parser';
import path from "path";


const allowedOrigins=['http://localhost:5173','http://localhost:5174']

dotenv.config()
const PORT=process.env.PORT||9000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
  }));
 
  const __dirname = path.resolve();
  // PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
  console.log(__dirname);
  
app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',userRouter)
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT,()=>{
    connectDB()
    console.log("PORT Running On ",PORT);
    
})