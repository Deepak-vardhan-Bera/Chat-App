import express from 'express'
import { getMessages, sendMessage } from '../controllers/message.controller.js'
import { verifyJwt } from '../middlewars/vertifyJwt.middleware.js'

const router=express.Router()

router.post('/send/:id',verifyJwt,sendMessage)
router.get('/:id',verifyJwt,getMessages)

export default router