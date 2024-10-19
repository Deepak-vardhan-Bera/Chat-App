import express from 'express'

import { verifyJwt } from '../middlewars/vertifyJwt.middleware.js';
import { signup,signin,forgotPassword,resetPassword,checkAuth,logout } from '../controllers/auth.controllers.js';

const router=express.Router();


router.post('/signup',signup)
router.post('/login',signin)
router.post('/logout',logout)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)
router.get('/check-auth',verifyJwt,checkAuth)

export default router