import express from 'express'
import { createUser, loginUser } from '../controllers/userController.js'
const userRouter = express.Router()

userRouter.post('/users',createUser)
userRouter.post('/loginuser',loginUser)

export default  userRouter