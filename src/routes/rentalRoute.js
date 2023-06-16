import express from 'express'
import { rentVehicle } from '../controllers/rentalController.js'

const rentalRouter = express.Router()

rentalRouter.post('/rentals',rentVehicle)

export default  rentalRouter