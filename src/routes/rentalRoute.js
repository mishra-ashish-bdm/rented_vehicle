import express from 'express'
import { rentVehicle, vehicleRentByUser } from '../controllers/rentalController.js'

const rentalRouter = express.Router()

rentalRouter.post('/rentals',rentVehicle)
rentalRouter.get('/vehiclerentbyuser',vehicleRentByUser)

export default  rentalRouter