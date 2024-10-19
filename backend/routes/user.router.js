import express from 'express'
import { verifyJwt } from '../middlewars/vertifyJwt.middleware.js'
import { getUsersForSidebar } from '../controllers/users.controller.js'

const router=express.Router()

router.get('/',verifyJwt,getUsersForSidebar)



export default router