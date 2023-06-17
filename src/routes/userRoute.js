import express from 'express'
import { createUser, detailsOfUser, loginUser } from '../controllers/userController.js'
const userRouter = express.Router()

userRouter.post('/users',createUser)
userRouter.post('/loginuser',loginUser)
userRouter.get('/userdetails',detailsOfUser)

export default  userRouter