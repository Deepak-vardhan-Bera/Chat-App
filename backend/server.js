import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import authRouter from './routes/authRouter.routes.js';
import messageRouter from './routes/message.router.js';
import userRouter from './routes/user.router.js';
import { connectDB } from './db/ConnectDb.js';
import { app, server } from './socket/socket.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT || 9000;

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://chat-app-deepak-0ggt.onrender.com',
    'https://chat-app-deepak-y3t6.onrender.com',
    'https://6718a281e99ca7589d6beda2--quiet-otter-2cf33d.netlify.app',
    'https://chat-app-deepak03.netlify.app/login'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Allow requests with no origin
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.options('*', cors()); // Handle preflight requests

app.use(express.json());
app.use(cookieParser());

// Serve static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "./frontend/dist")));

// Define routes
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/user', userRouter);

// Fallback for SPA
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
server.listen(PORT, () => {
    connectDB();
    console.log("Server running on port", PORT);
});
