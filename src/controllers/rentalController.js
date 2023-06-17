import rentalModel from "../models/rentModel.js";
// Rent a vehicle

export const rentVehicle = async (req, res) => {
  try {
    const { user, vehicleId, rentalDates } = req.body;
    const rental = await rentalModel.create({
      user,
      vehicleId,
      rentalDates: rentalDates.map(date => new Date(date))
    });
    res.status(201).json(rental);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to rent a vehicle' });
  }
}

// find the vehicle rent details by particular user

export const vehicleRentByUser = async (req, res) => {
  try {
    const results = await rentalModel.aggregate([
      {
        $lookup: {
          from: 'vehicles',
          localField: 'vehicleId',
          foreignField: '_id',
          as: 'vehicle'
        }
      },
      {
        $unwind: '$vehicle'
      },
      {
        $project: {
          userId: '$user',
          'vehicle._id': 1,
          'vehicle.type': 1,
          'vehicle.name': 1,
          rentalDates: 1
        }
      }
    ]);
  
    res.status(200).json({
        data:results
    })
  } catch (error) {
    console.error(error);
  }
};


export const bookVehicle = async (req, res) => {
  try {
    const { user, vehicleId, rentalDates } = req.body;

    // Check if the vehicle is available for the given rental dates
    const existingRental = await rentalModel.findOne({
      vehicleId,
      rentalDates: { $in: rentalDates },
    });

    if (existingRental) {
      return res.status(400).json({ message: 'Vehicle is already booked for the given dates.' });
    }

    // Create a new rental entry
    const rental = new rentalModel({
      user,
      vehicleId,
      rentalDates,
    });

    await rental.save();

    return res.status(200).json({ message: 'Vehicle booked successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while booking the vehicle.' });
  }
};


