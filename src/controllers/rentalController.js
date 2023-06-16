import rentalModel from "../models/rentModel.js";

// Rent a vehicle

export const rentVehicle = async (req, res) => {
    try {
        const { userId, vehicleId, rentalDates } = req.body;
        const rental = await rentalModel.create({
          userId,
          vehicleId,
          rentalDates: rentalDates.map(date => new Date(date))
        });
        res.status(201).json(rental);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to rent a vehicle' });
      }
}


