import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './routes/userRoute.js'
import rentalRouter from './routes/rentalRoute.js'
import vehicleRouter from './routes/vehicleRoute.js'
const app = express()
app.use(express.json())
dotenv.config()
connectDB()

let PORT = process.env.PORT || 3000

app.use(userRouter)
app.use(vehicleRouter)
app.use(rentalRouter)


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})