import vehicleModel from "../models/vehicleModel.js";

// Get all vehicle types

export const getVehicleTypes = async (req, res) => {
    try {
        const vehicleTypes = await vehicleModel.distinct('type');
        res.status(200).json(vehicleTypes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve vehicle types' });
    }
}


// Get vehicles by type

export const getVehiclesByType = async (req, res) => {
    try {
        const { vehicleType } = req.params;
        const vehicles = await vehicleModel.find({ type: vehicleType });
        res.status(200).json(vehicles);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve vehicles' });
    }
}