import express from 'express'
import { getVehicleTypes, getVehiclesByType } from '../controllers/vehicleController.js'

const vehicleRouter = express.Router()

vehicleRouter.get('/vehicle-types',getVehicleTypes)
vehicleRouter.get('/vehicles/:vehicleType',getVehiclesByType)


export default  vehicleRouter