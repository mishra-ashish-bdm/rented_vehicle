import express from 'express'
import { bookVehicle, rentVehicle, vehicleRentByUser } from '../controllers/rentalController.js'

const rentalRouter = express.Router()

rentalRouter.post('/rentals',rentVehicle)
rentalRouter.get('/vehiclerentbyuser',vehicleRentByUser)
rentalRouter.post('/bookvehicle',bookVehicle)

export default  rentalRouter