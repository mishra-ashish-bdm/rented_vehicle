import rentalModel from "../models/rentModel.js";

// Rent a vehicle

export const rentVehicle = async (req, res) => {
    try {
        const { userId, vehicleId, rentalDates } = req.body;
        const rental = await rentalModel.create({ userId, vehicleId, rentalDates });
        res.status(201).json(rental);
    } catch (err) {
        res.status(500).json({ error: 'Failed to rent a vehicle' });
    }
}


