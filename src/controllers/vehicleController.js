import vehicleModel from "../models/vehicleModel.js";

// Get all vehicle types

export const getVehicleTypes = async (req, res) => {
    try {
        const vehicleTypes = await vehicleModel.distinct('type');
        res.status(200).json(vehicleTypes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to retrieve vehicle types' });
    }
}


// Get vehicles by type

export const getVehiclesByType = async (req, res) => {
    try {
        const  id = req.params.id;
        console.log(id);
        const vehicles = await vehicleModel.findById({ _id:id });
        console.log('this is vehicles');
        res.status(200).json(vehicles);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve vehicles' });
    }
}